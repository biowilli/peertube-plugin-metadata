const exec = require("child_process").exec;
const {
  ebucoreInfoStream,
  ebucoreVideoStreamPropertyTransformer,
  ebuAudioStreamPropertyTransformer,
  ebucoreTextStreamPropertyTransformer,
} = require("../transformers/mediainfoEBUTransformer");

const { ebuTemplate } = require("../templates/mediainfoEbuTemplate");

class MediaInfo {
  postProcessInfoStreams(infoStream) {
    infoStream["streamCount"] =
      infoStream["videoCount"] +
      infoStream["audioCount"] +
      infoStream["textCount"] +
      infoStream["menuCount"];

    return infoStream;
  }

  mapper(stream, targetObject, transformer) {
    for (const tObj of transformer) {
      if (tObj[0] in stream) {
        targetObject[tObj[1]] = tObj[2](stream[tObj[0]]);
      }
    }
  }

  updateEBUTemplate(template, key, value) {
    console.log(key);
    console.log(value);
  }

  analyzeVideo(path) {
    const self = this;
    return new Promise((resolve, reject) => {
      exec(
        `mediainfo --Full --Output=EBUCore_JSON "${path}"`,
        function (error, standardOutput, standardError) {
          //console.log("standardOutput", standardOutput);
          if (standardError !== "") {
            console.log("Standard Error " + standardError);
            return;
          }

          if (error !== null) {
            console.log("exec error: " + error);
            return;
          }

          try {
            var mediainfoData = JSON.parse(standardOutput);
            resolve(mediainfoData);
          } catch (parseError) {
            console.error("Error parsing the JSON output: ", parseError);
            reject(parseError);
          }
        }
      );
    });
  }
}

module.exports = MediaInfo;
