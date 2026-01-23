#!/usr/bin/env node
/*
 * Dev wrapper: runs `ng serve --host 0.0.0.0` and prints a mobile testing URL
 * with test workspace + admin key once the port is known. Also mirrors Angular
 * output so normal DX remains unchanged.
 */

const os = require('os');
const { spawn } = require('child_process');

// Test credentials (from repo instructions)
const WORKSPACE = '61358757-cf32-483f-847f-3e4eb3855408';
const API_KEY_ADMIN = 'e79d200e-b5e3-4043-9c4b-6deddb642fb0';

// Route to test
const ROUTE = '/showcase-ws';

// Determine LAN IP (prefer IPv4, non-internal)
function getLanIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

function formatUrl(host, port) {
  return `http://${host}:${port}${ROUTE}?workspace=${WORKSPACE}&api_key=${API_KEY_ADMIN}`;
}

// Start Angular dev server binding to all interfaces for LAN access
const args = ['serve', '--host', '0.0.0.0'];
const ng = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['ng', ...args], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: process.env,
});

let printed = false;
let detectedPort = process.env.PORT || '4200'; // fallback; will update when we parse output
const lanIp = getLanIp();
let sawLocalLine = false;
let sawNetworkLine = false;
let printScheduled = false;

function maybePrint(force = false) {
  if (printed) return;
  if (!detectedPort) return;
  if (!force && !(sawLocalLine && sawNetworkLine)) return;
  printed = true;
  const localUrl = formatUrl('localhost', detectedPort);
  const mobileUrl = formatUrl(lanIp, detectedPort);
  const longest = Math.max(localUrl.length, mobileUrl.length);
  const divider = '-'.repeat(Math.max(60, longest + 10));
  process.stdout.write(`\n${divider}\n`);
  process.stdout.write(' Local development URL:\n');
  process.stdout.write(`  ${localUrl}\n\n`);
  process.stdout.write(' Mobile testing URL (tap on your phone):\n');
  process.stdout.write(`  ${mobileUrl}\n`);
  process.stdout.write(`${divider}\n\n`);
}

function mirrorAndParse(data) {
  const text = data.toString();
  process.stdout.write(text);

  // Try to capture port from Angular/Vite dev server output lines
  // Examples to match:
  //  - Local:   http://localhost:4200/
  //  - Network: http://192.168.1.23:4200/
  //  - ✔ Compiled successfully
  //  - Listening on: http://localhost:64985/
  // Capture Local/Network lines explicitly and extract the port
  const localLine = text.match(/\bLocal:\s+https?:\/\/[^:\s]+:(\d{2,5})\/?/i);
  const networkLine = text.match(/\bNetwork:\s+https?:\/\/[^:\s]+:(\d{2,5})\/?/i);
  if (localLine && localLine[1]) {
    detectedPort = localLine[1];
    sawLocalLine = true;
  }
  if (networkLine && networkLine[1]) {
    detectedPort = networkLine[1];
    sawNetworkLine = true;
  }

  // Fallback generic port match if needed
  const portMatch = (!sawLocalLine && !sawNetworkLine) ? text.match(/:\s*(\d{2,5})\/?/) : null;
  if (portMatch && portMatch[1]) {
    detectedPort = portMatch[1];
  }

  // When Angular has printed both Local and Network, schedule our block at the end
  if ((sawLocalLine || sawNetworkLine) && !printScheduled) {
    printScheduled = true;
    setTimeout(() => maybePrint(true), 50);
  }
  // Do not print early on generic success lines; we want to be last.
}

ng.stdout.on('data', mirrorAndParse);
ng.stderr.on('data', (d) => {
  // Mirror stderr as well
  mirrorAndParse(d);
});

ng.on('close', (code) => {
  process.exit(code);
});
