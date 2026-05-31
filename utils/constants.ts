export const API_ROUTE = {
  CREATE_PROMPT: '/api/generate-prompt',
  GENERATE_WALLPAPER: '/api/generate-wallpaper',
  PUBLISH_CREATION: '/api/publish'
};

export const GALLERY_TYPE = {
  THEME: 'theme',
  WALLPAPER: 'wallpaper'
} as const;

export const THEME_SCHEMA = {
  palette: ['#FFFFFF', '#000000', '#808080'],
  typography: 'string',
  style: 'string'
};
