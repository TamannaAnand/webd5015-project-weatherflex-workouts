/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {}

module.exports = nextConfig


module.exports = {
  env: {
    VERCEL_TOKEN: process.env.VERCEL_TOKEN,
    VERCEL_ORG_ID: process.env.VERCEL_ORG_ID,
    VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID,
  },
};

