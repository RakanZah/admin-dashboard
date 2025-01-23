import type { NextConfig } from "next";
import dotenv from "dotenv";

// Load environment variables from the `.env` file
dotenv.config();

const nextConfig: NextConfig = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  /* config options here */
};

export default nextConfig;
