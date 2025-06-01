import json
import concurrent.futures
from io import BytesIO
import numpy as np
from sklearn.manifold import TSNE
from scipy.spatial.distance import cdist
from lapjv import lapjv
import random
import math
import os
from PIL import Image
from skimage import transform
from scipy.ndimage import gaussian_filter

EMBEDDING_DIMENSION = 3072
PERPLEXITY = 50
TSNE_ITER = 5000
ORIGINAL_IMAGE_SIZE = (530, 1000)
CELL_RATIOS = (1.86, 1.135)

OUT_DIM_X = 14
OUT_RATIO = 16/9
OUT_DIM_Y = int(math.ceil(OUT_DIM_X * ORIGINAL_IMAGE_SIZE[0] * CELL_RATIOS[0] * OUT_RATIO / (ORIGINAL_IMAGE_SIZE[1] * CELL_RATIOS[1])))
out_dim = (OUT_DIM_X, OUT_DIM_Y)
print("Output dimensions:", out_dim)
TO_PLOT = int(out_dim[0] * out_dim[1] * 0.75)
SIDE = 1000
PADDING = int(0.285 * SIDE)

def load_records():
    with open('sample/affb/records_with_embeddings.json', 'r') as f:
        return json.load(f)

def generate_tsne(activations, to_plot, perplexity=50, tsne_iter=5000):
    tsne = TSNE(perplexity=perplexity, n_components=2, init='random', n_iter=tsne_iter)
    X_2d = tsne.fit_transform(np.array(activations)[0:to_plot,:])
    X_2d -= X_2d.min(axis=0)
    X_2d /= X_2d.max(axis=0)
    return X_2d

def calc_tsne_grid(X_2d, out_dim):
    grid = np.dstack(np.meshgrid(np.linspace(0, 1, out_dim[1]), np.linspace(0, 1, out_dim[0]))).reshape(-1, 2)
    cost_matrix = cdist(grid, X_2d, "sqeuclidean").astype(np.float32)
    cost_matrix = cost_matrix * (100000 / cost_matrix.max())
    shp = cost_matrix.shape
    cost_matrix = np.hstack((cost_matrix, np.zeros((shp[0], shp[0] - shp[1]))))
    _, col_asses, _ = lapjv(cost_matrix)
    grid_jv = grid[col_asses]
    print("Grid shape:", grid_jv.shape)
    print("Grid", grid_jv)
    return grid_jv

def get_image(filename, target_size):
    # target_size = (width, height)
    # Open the image size, resize it to the target size (maintaining aspect ratio) and return a cropped image of the target size out the center
    inner_target_size = int(target_size[0] / CELL_RATIOS[0]), int(target_size[1] / CELL_RATIOS[1])
    if not filename:
        filename = 'empty-space.png'
        img = Image.open(filename)
        _image = Image.new("RGBA", img.size, "WHITE") 
        _image.paste(img, (0, 0), img)         
        img = _image.convert('RGB')
        img = img.resize(inner_target_size, Image.Resampling.LANCZOS)
    # if not filename:
    #     img = Image.new('RGB', inner_target_size, (250, 250, 250))        
    else:
        img = Image.open(f'sample/affb/{filename}')
        ratio = max(inner_target_size[0] / img.width, inner_target_size[1] / img.height)
        # resize the image by ratio:
        img = img.resize((int(img.width * ratio), int(img.height * ratio)), Image.Resampling.LANCZOS)
        # crop the image to the target size out the center
        img = img.crop((img.size[0]//2 - inner_target_size[0]//2, img.size[1]//2 - inner_target_size[1]//2,
                        img.size[0]//2 + inner_target_size[0]//2, img.size[1]//2 + inner_target_size[1]//2))
        img = img.resize(inner_target_size, Image.Resampling.LANCZOS)
    rotate = random.randint(0, 64) - 32
    img = img.rotate(rotate, expand=True, fillcolor=(255, 255, 255))
    out_img = Image.new('RGB', target_size, (255, 255, 255))
    # print("Internal Image:", inner_target_size, rotate, (img.width, img.height), target_size)
    assert target_size[0] >= img.width, f'{target_size[0]} < {img.width}'
    assert target_size[1] >= img.height, f'{target_size[1]} < {img.height}'
    out_img.paste(img, ((target_size[0] - img.width) // 2, (target_size[1] - img.height) // 2))
    return out_img

def create_tsne_image(grid_jv, records, out_dim, res, offset, padding):
    # print('>>>', filename)
    info = dict(dim=out_dim, grid=[])

    out_res_x, out_res_y = res
    offset_x, offset_y = offset
    padding_x, padding_y = padding
    out = np.ones((out_dim[1]*out_res_y + padding_y, out_dim[0]*out_res_x + padding_x, 3), dtype=np.uint8) * 255
    print("Output:", out_dim, res, out.shape, out.dtype)
    # alpha = np.zeros((img_dim*out_res_y, img_dim*out_res_x, 1))
    # used = set()
    positions = dict()
    for pos, record in zip(grid_jv, records):
        pos_x = round(pos[1] * (out_dim[0] - 1))# + img_ofs
        pos_y = round(pos[0] * (out_dim[1] - 1))# + img_ofs
        pos = (int(pos_y), int(pos_x))
        positions[pos] = record
    for pos_x in range(out_dim[0]):
        for pos_y in range(out_dim[1]):
            pos = (pos_y, pos_x)
            record = positions.get(pos)
            # print('Record:', pos, '->', repr(record)[:200])
            if record is not None:
                filename = record['filename']
            else:
                filename = None
            print(f"Processing {pos}: {filename}")
            img = get_image(filename, res)
            if callable(offset_x):
                _offset_x = offset_x(pos_x, pos_y)
            else:
                _offset_x = offset_x
            if callable(offset_y):
                _offset_y = offset_y(pos_x, pos_y)
            else:
                _offset_y = offset_y
            h_range = pos_y * out_res_y + _offset_y
            w_range = pos_x * out_res_x + _offset_x
            # img = (np.asarray(img) / 255.0).astype(np.float32)
            # print("Image:", img.shape, img.dtype, out.dtype)
            # print("Copying:", pos_y, h_range, out_res_y, '/', pos_x, w_range, out_size_x)
            out[h_range:h_range + out_res_y, w_range:w_range + out_res_x] = img
            # alpha[h_range:h_range + out_size_y, w_range:w_range + out_size_x] = 255*np.ones((out_size_y, out_size_x, 1))
            info['grid'].append(dict(pos=dict(x=pos_x, y=pos_y), item=filename))

    # Save out as png:
    # im = Image.fromarray(out)
    # im = image.array_to_img(out)
    # im.putalpha(image.array_to_img(alpha))
    return out, info


# def _create_tiles(filename, image: Image, out_dim, res, info, current_set):
#     dim_zoom = round(math.log2(out_dim))
#     edge = 2**math.ceil(math.log2(out_dim)) * res[0]
#     tile_size = 256
#     max_cut_size = tile_size * 4
#     max_zoom = info['max_zoom'] = 8
#     min_zoom = info['min_zoom'] = 8 - dim_zoom

#     with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
#         for zoom in range(min_zoom, max_zoom + 1):
#             num_cuts = (2**(zoom - min_zoom))
#             cut_size = edge / num_cuts
#             if cut_size > max_cut_size:
#                 scaledown_size = math.ceil((max_cut_size * num_cuts * out_dim * res[0]) / edge)
#                 cut_size = max_cut_size
#                 scaledown = image.resize((scaledown_size, scaledown_size), Image.NEAREST)
#             else:
#                 scaledown = image

#             for x in range(num_cuts):
#                 for y in range(num_cuts):
#                     key = f'feature-tiles/{current_set}/{filename}/{zoom}/{x}/{y}'
#                     left = math.floor(x * cut_size)
#                     upper = math.floor(y * cut_size)
#                     right = math.ceil((x+1) * cut_size - 1)
#                     lower = math.ceil((y+1) * cut_size - 1)
#                     tile: Image = scaledown.crop((left, upper, right, lower))
#                     tile = tile.resize((tile_size, tile_size), resample=Image.BICUBIC)

#                     buff = BytesIO()
#                     tile.save(buff, format='png', quality=90)
#                     buff.seek(0)
#                     executor.submit(upload_fileobj_s3, buff, key, 'image/png')

def create_tiles(prefix: str, image: Image):
    w, h = image.size
    max_size = max(w, h)
    tile_size = 256
    num_tiles = math.ceil(max_size / tile_size)
    zoom_level = math.ceil(math.log2(num_tiles))
    num_tiles = 2**zoom_level
    max_zoom = 8
    min_zoom = 8 - zoom_level
    print(f"Tiles: {prefix} ({w}x{h}) -> {num_tiles}x{num_tiles} ({tile_size}px) {zoom_level} levels")

    for z in range(zoom_level):
        zoom = max_zoom - z
        skip = 2**z
        # _tile_size = tile_size * skip
        _num_tiles = num_tiles // skip
        print(f"Zoom {zoom}: {_num_tiles}x{_num_tiles} ({tile_size}px)")
        if skip > 1:
            # Blur image to reduce aliasing
            image = image.resize((w // 2, h // 2), Image.Resampling.LANCZOS)
            # image = np.asarray(image)
            # w, h = image.shape[1], image.shape[0]
            w, h = image.size
        for x in range(_num_tiles):
            os.makedirs(f'tiles/{prefix}/{zoom}/{x}', exist_ok=True)
            for y in range(_num_tiles):
                # target = np.ones((_tile_size, _tile_size, 3), dtype=np.uint8) * 255
                # target = np.ones((tile_size, tile_size, 3), dtype=np.uint8) * 255
                target = Image.new('RGB', (tile_size, tile_size), (255, 255, 255))
                left = min(x * tile_size, w)
                upper = min(y * tile_size, h)
                right = min(left + tile_size, w)
                lower = min(upper + tile_size, h)
                # tgt_width = len(range(left, right, skip))
                # tgt_height = len(range(upper, lower, skip))
                # target[:tgt_height, :tgt_width] = image[upper:lower:skip, left:right:skip]
                # target[:lower-upper, :right-left] = image[upper:lower, left:right]
                target.paste(image.crop((left, upper, right, lower)), (0, 0))
                # target = transform.rescale(target, (tile_size / _tile_size, tile_size / _tile_size, 1), anti_aliasing=False)
                # target = Image.fromarray((target * 255).astype(np.uint8))
                # target = Image.fromarray(target)
                target.save(f'tiles/{prefix}/{zoom}/{x}/{y}.png', format='PNG', compress_level=0)

def main():
    records_with_embeddings = load_records()

    records, activations = records_with_embeddings, [rec['embedding'] for rec in records_with_embeddings]

    print("Generating 2D representation.")
    X_2d = generate_tsne(activations, TO_PLOT, PERPLEXITY, TSNE_ITER)
    print("Generating image grid (%dx%d, %d images)" % (out_dim[0], out_dim[1], len(records)))
    grid = calc_tsne_grid(X_2d, out_dim)

    try:
        # w, h = 530, 1000
        w, h = ORIGINAL_IMAGE_SIZE[0] * CELL_RATIOS[0], ORIGINAL_IMAGE_SIZE[1] * CELL_RATIOS[1]
        dim = max(w, h)
        res = (int(SIDE*w/dim), int(SIDE*h/dim))
        offset = (0, lambda x, _: PADDING * (x%2))
        padding = (0, PADDING)
        image, info = create_tsne_image(grid, records, out_dim, res, offset, padding)
        print('Image:', image.shape, image.dtype)
        image = Image.fromarray(image)
        print('Image:', image.size, image.mode, image.format)
        image.save('tsne.png', format='PNG', compress_level=9)
        print("Creating tiles.")
        # create_tiles('4d2c04b0-51b7-4aa2-a234-0e4be53447de/0', image)
        print('Saved image to tsne.png')
        print(info)

    except Exception as e:
        print("Error generating image:", e)
        raise

if __name__ == "__main__":
    main()


# create_tiles(filename, image, out_dim, (side, side), info, current_set)