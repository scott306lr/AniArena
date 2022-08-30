// @ts-check
import { env } from "./src/env/server.mjs";

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return bundleAnalyzer(config);
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.discordapp.net', 'images-ext-1.discordapp.net', 'lh3.googleusercontent.com', 'mudae.net', 'imgur.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: { images: { allowFutureImage: true } }
});