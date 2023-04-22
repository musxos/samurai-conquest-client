/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    samuraiAddress: '0x8B9887B48268FfbaF35a971788750715d8F2cF51',
    marketplaceAddress: '0x58AA1E788EE0E8cC8ad3D51D9ABb6aA1c79f9f0e',
    gameAddress: '0xA2420824dDA0A74f690062eE597ba561699681F2'
  }
}

module.exports = nextConfig
