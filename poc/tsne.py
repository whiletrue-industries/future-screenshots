import json
import numpy as np
from sklearn.manifold import TSNE
from scipy.spatial.distance import cdist
from lapjv import lapjv
import random
from PIL import Image

EMBEDDING_DIMENSION = 3072
PERPLEXITY = 50
TSNE_ITER = 5000
out_dim = (30, 15)
TO_PLOT = 450
side = 1000

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
    return grid_jv

def get_image(filename, target_size):
    # target_size = (width, height)
    # Open the image size, resize it to the target size (maintaining aspect ratio) and return a cropped image of the target size out the center
    inner_target_size = int(target_size[0] / 1.86), int(target_size[1] / 1.135)
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

def create_tsne_image(grid_jv, records, out_dim, to_plot, res, offset, out_size, padding):
    # print('>>>', filename)
    info = dict(dim=out_dim, grid=[])

    out_res_x, out_res_y = res
    offset_x, offset_y = offset
    padding_x, padding_y = padding
    out_size_x, out_size_y = out_size
    out = np.ones((out_dim[1]*out_res_y + padding_y, out_dim[0]*out_res_x + padding_x, 3), dtype=np.uint8)*255
    print("Output:", out_dim, res, out.shape, out.dtype)
    # alpha = np.zeros((img_dim*out_res_y, img_dim*out_res_x, 1))
    # used = set()
    positions = dict()
    for pos, record in zip(grid_jv, records[0:to_plot]):
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
            img = get_image(filename, out_size)
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
            img = np.asarray(img)
            # print("Image:", img.shape, img.dtype, out.dtype)
            # print("Copying:", pos_y, h_range, out_size_y, '/', pos_x, w_range, out_size_x)
            out[h_range:h_range + out_size_y, w_range:w_range + out_size_x] = img
            # alpha[h_range:h_range + out_size_y, w_range:w_range + out_size_x] = 255*np.ones((out_size_y, out_size_x, 1))
            info['grid'].append(dict(pos=dict(x=pos_x, y=pos_y), item=filename))

    # Save out as png:
    im = Image.fromarray(out)
    # im = image.array_to_img(out)
    # im.putalpha(image.array_to_img(alpha))
    return im, info

records_with_embeddings = load_records()

records, activations = records_with_embeddings, [rec['embedding'] for rec in records_with_embeddings]

print("Generating 2D representation.")
X_2d = generate_tsne(activations, TO_PLOT, PERPLEXITY, TSNE_ITER)
print("Generating image grid (%dx%d, %d images)" % (out_dim[0], out_dim[1], len(records)))
grid = calc_tsne_grid(X_2d, out_dim)

print("Generating image.", [x['filename'] for x in records[:10]])
try:
    # w, h = 530, 1000
    w, h = 530 * 1.86, 1000 * 1.135
    dim = max(w, h)
    size = side #*0.9
    size = (int(size*w/dim), int(size*h/dim))
    res = (int(side*w/dim), int(side*h/dim))
    offset = (0, lambda x, y: 285 * (x%2)) #(int((res[0] - size[0])/2), int((res[1] - size[1])/2))
    padding = (0, 285)
    image, info = create_tsne_image(grid, records, out_dim, 10000,
                                    res, offset, size, padding)
except Exception as e:
    print("Error generating image:", e)
    raise
image.save('tsne.png')
print('Saved image to tsne.png')
print(info)
# create_tiles(filename, image, out_dim, (side, side), info, current_set)