const { toBool, convertNumToTime, ratioToNumber } = require("./utils");

var formatPropTransformers = [
  ["filename", "filename", (val) => val],
  ["nb_streams", "num_streams", (val) => parseInt(val)],
  ["nb_programs", "num_programs", (val) => parseInt(val)],
  ["format_name", "format_name", (val) => val.split(",")],
  ["long_format_name", "long_format_name", (val) => val],
  ["start_time", "start_time", (val) => parseFloat(val)],
  ["duration", "duration", (val) => convertNumToTime(parseFloat(val))],
  ["size", "size", (val) => parseInt(val)],
  ["bit_rate", "bit_rate", (val) => parseInt(val)],
  ["tags", "tags", (val) => val],
];

var streamPropTransformers = [
  ["index", "index", (val) => val],
  //['language', 'language', (val) => val],
  ["codec_name", "codec_name", (val) => val],
  ["codec_long_name", "codec_long_name", (val) => val],
  ["codec_tag_string", "codec_tag", (val) => val],
  ["profile", "profile", (val) => val],
  ["width", "width", (val) => val],
  ["height", "height", (val) => val],
  ["coded_width", "coded_width", (val) => val],
  ["coded_height", "coded_height", (val) => val],
  ["sample_aspect_ratio", "sample_aspect_ratio", (val) => val],
  ["display_aspect_ratio", "display_aspect_ratio", (val) => val],
  [
    "sample_aspect_ratio",
    "sample_aspect_ratio_num",
    (val) => ratioToNumber(val),
  ],
  [
    "display_aspect_ratio",
    "display_aspect_ratio_num",
    (val) => ratioToNumber(val),
  ],
  ["pix_fmt", "pix_fmt", (val) => val],
  ["is_avc", "is_avc", (val) => toBool(val)],
  ["sample_fmt", "sample_fmt", (val) => val],
  ["sample_rate", "sample_rate", (val) => parseInt(val)],
  ["channels", "channels", (val) => parseInt(val)],
  //['channel_layout', 'channel_layout', (val) => val],
  ["avg_frame_rate", "frame_rate", (val) => ratioToNumber(val)],
  ["time_base", "time_base", (val) => ratioToNumber(val)],
  ["start_time", "start_time", (val) => parseFloat(val)],
  ["duration", "duration", (val) => parseFloat(val)],
  ["duration", "duration_ts", (val) => convertNumToTime(parseFloat(val))],
  ["bit_rate", "bit_rate", (val) => parseInt(val)],
  ["bits_per_raw_sample", "bits_per_raw_sample", (val) => parseInt(val)],
];

//utils repo
var dispositionPropTransformers = [
  ["default", "default", (val) => toBool(val)],
  ["dub", "dub", (val) => toBool(val)],
  ["original", "original", (val) => toBool(val)],
  ["comment", "comment", (val) => toBool(val)],
  ["lyrics", "lyrics", (val) => toBool(val)],
  ["karaoke", "karaoke", (val) => toBool(val)],
  ["forced", "forced", (val) => toBool(val)],
  ["hearing_impaired", "hearing_impaired", (val) => toBool(val)],
  ["visual_impaired", "visual_impaired", (val) => toBool(val)],
  ["clean_effects", "clean_effects", (val) => toBool(val)],
  ["attached_pic", "attached_pic", (val) => toBool(val)],
  ["timed_thumbnails", "timed_thumbnails", (val) => toBool(val)],
];

var mapChannel2Layout = {
  mono: 1,
  stereo: 2,
  quad: 4,
  "3.0": 3,
  "5.0": 5,
  5.1: 6,
  "6.0": 6,
  6.1: 7,
  "7.0": 7,
  7.1: 8,
  "8.0": 8,
  8.1: 9,

  1: "mono",
  2: "stereo",
  3: "3.0",
  4: "quad",
  5: "5.0",
  6: "5.1",
  7: "6.1",
  8: "7.1",
  9: "8.1",
};

module.exports = {
  formatPropTransformers,
  streamPropTransformers,
  dispositionPropTransformers,
  mapChannel2Layout,
};
