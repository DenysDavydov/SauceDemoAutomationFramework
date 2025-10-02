import { defineConfig } from '@playwright/test';
import config from "./testrun-config";

export default defineConfig(config.playwright);