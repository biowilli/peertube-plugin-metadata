const ffprobeStatic = require("ffprobe-static");
const exec = require("child_process").exec;
const {
  formatPropTransformers,
  streamPropTransformers,
  dispositionPropTransformers,
  mapChannel2Layout,
} = require("../transformers/ffprobeTransformer");

const {
  disposition,
  templateObjectAudio,
  templateObjectVideo,
} = require("../templates/ffprobeTemplate");

class FFProbe {
  counterAudio = 0;
  counterVideo = 0;

  analyzeVideo(path) {
    return new Promise((resolve, reject) => {
      exec(
        `"${ffprobeStatic.path}" -v quiet -print_format json -show_format -show_streams "${path}"`,
        (error, stdout, stderr) => {
          try {
            console.log("stdout: " + stdout);
            console.log("stderr: " + stderr);
            if (error !== null) {
              console.log("exec error: " + error);
            }

            var ffprobeData = JSON.parse(stdout);
            return resolve(this.processFFProbeData(ffprobeData));
          } catch (error) {
            console.error("FFProbe Analyseerror:", error);
            return reject(error);
          }
        }
      );
    });
  }

  toSurroundType(val, numChannels) {
    const reSurroundTypes = new RegExp(
      "^(d{1,2}.d|mono|stereo|quad)(?:(w+))?$"
    );

    if (typeof numChannels === "number") {
      if (mapChannel2Layout.hasOwnProperty(numChannels)) {
        numChannels = mapChannel2Layout[numChannels];
      } else {
        numChannels = `${val}.0`;
      }
    }

    if (val === null) {
      return numChannels;
    }
    if (typeof val === "number") {
      if (Number.isInteger(val)) {
        return `${val}.0`;
      } else {
        let val1 = Math.floor(val);
        let val2 = Math.floor((val - val1) * 10);
        return `${val1}.${val2}`;
      }
    }
    if (typeof val !== "string") {
      return numChannels;
    }

    let result = reSurroundTypes.exec(val);
    if (!result) {
      return numChannels;
    }

    return result[1].toLowerCase();
  }

  processFFProbeData(ffprobeData) {
    //TODO Hier passiert ein fehler
    console.log("here I am", ffprobeData);
    if (ffprobeData === undefined) {
      return {};
    }
    const audioStreams = [];
    const videoStreams = [];
    const textStreams = [];
    const menuStreams = [];
    const format = {
      title: null,
      filename: null,
      num_streams: null,
      num_programs: null,
      format_name: null,
      format_long_name: null,
      start_time: null,
      duration: null,
      size: null,
      bit_rate: null,
      tags: {},
    };
    let defaultAudioStream = {};
    let defaultVideoStream = {};

    if (ffprobeData.format) {
      for (const [key, value] of Object.entries(formatPropTransformers)) {
        if (ffprobeData.format[key] !== undefined) {
          format[value[1]] = value[2](ffprobeData.format[key]);
        }
      }
    }

    ffprobeData.streams.forEach((stream) => {
      if (stream["codec_type"] == "audio") {
        var object = Object.assign({}, templateObjectAudio);
        object["disposition"] = Object.assign({}, disposition);

        this.mapper(stream, object, streamPropTransformers);
        if (stream["disposition"]) {
          this.mapper(
            stream["disposition"],
            object["disposition"],
            dispositionPropTransformers
          );
        }
        if (stream["channel_layout"]) {
          object["channel_layout"] = this.toSurroundType(
            stream["channel_layout"],
            6
          );
        }

        if (this.counterAudio == 0) {
          defaultAudioStream.index = object.index;
        }
        if (object.disposition.default) {
          defaultAudioStream.index = object.index;
          defaultAudioStream.position = this.counterAudio;
        }
        this.counterAudio++;
        audioStreams.push(object);
        return;
      }

      if (stream["codec_type"] == "video") {
        var object = Object.assign({}, templateObjectVideo);
        object["disposition"] = Object.assign({}, disposition);

        this.mapper(stream, object, streamPropTransformers);

        if (stream["disposition"]) {
          this.mapper(
            stream["disposition"],
            object["disposition"],
            dispositionPropTransformers
          );
        }

        if (this.counterVideo == 0) {
          defaultVideoStream.index = object.index;
        }
        if (object.disposition.default) {
          defaultVideoStream.index = object.index;
          defaultVideoStream.position = this.counterVideo;
        }
        this.counterVideo++;
        videoStreams.push(object);
        return;
      }
    });

    if (ffprobeData["format"]) {
      this.mapper(ffprobeData.format, format, formatPropTransformers);
    }

    var combinedStreams = {
      format: format,
      defaultAudioStream: defaultAudioStream,
      defaultVideoStream: defaultVideoStream,
      audioStreams: audioStreams,
      videoStreams: videoStreams,
      textStreams: textStreams,
      menuStreams: menuStreams,
    };

    return combinedStreams;
  }

  mapper(source, target, transformers) {
    transformers.forEach((transformer) => {
      if (source[transformer[0]] !== undefined) {
        target[transformer[1]] = transformer[2](source[transformer[0]]);
      }
    });
  }
}

module.exports = FFProbe;
