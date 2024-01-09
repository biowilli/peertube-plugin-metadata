var disposition = {
  default: false,
  dub: false,
  original: false,
  comment: false,
  lyrics: false,
  karaoke: false,
  forced: false,
  hearing_impaired: false,
  visual_impaired: false,
  clean_effects: false,
  attached_pic: false,
  timed_thumbnails: false,
};

var templateObjectAudio = {
  index: null,

  language: "und",

  codec_name: null,
  codec_long_name: null,
  codec_tag: null,
  profile: null,

  sample_fmt: null,
  sample_rate: null,

  channels: null,
  channel_layout: null,

  time_base: null,
  start_time: 0,
  duration: null,
  bit_rate: null,
  bits_per_raw_sample: null,
};

var templateObjectVideo = {
  index: null,

  language: "und",

  codec_name: null,
  codec_long_name: null,
  codec_tag: null,
  profile: null,

  width: null,
  height: null,

  coded_width: null,
  coded_height: null,

  sample_aspect_ratio: null,
  display_aspect_ratio: null,

  sample_aspect_ratio_num: null,
  display_aspect_ratio_num: null,

  pix_fmt: null,
  is_avc: null,
  frame_rate: null,
  time_base: null,
  start_time: null,
  duration: null,
  bit_rate: null,
};

module.exports = {
  disposition,
  templateObjectAudio,
  templateObjectVideo,
};
