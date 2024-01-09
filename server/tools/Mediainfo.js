const exec = require("child_process").exec;
const {
  infoStreamPropertyTransformer,
  commonStreamPropertyTransformers,
  commonMediaStreamPropertyTransformer,
  videoStreamPropertyTransformer,
  audioStreamPropertyTransformer,
  textStreamPropertyStreamTransfomer,
  menuStreamPropertyTransformer,
} = require("../transformers/mediainfoTransformer");

const {
  infoStreamTemplate,
  commonStreamTemplate,
  commonMediaStreamTemplate,
  videoStreamTemplate,
  audioStreamTemplate,
  textStreamTemplate,
  menuStreamTemplate,
} = require("../templates/mediainfoTemplate");

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

  analyzeVideo(path) {
    return new Promise((resolve, reject) => {
      exec(
        `mediainfo --Output=JSON "${path}"`,
        function (error, standardOutput, standardError) {
          if (standardError !== "") {
            console.log("Standard Error " + standardError);
            return;
          }

          if (error !== null) {
            console.log("exec error: " + error);
            return;
          }

          try {
            let mediainfoData = JSON.parse(standardOutput);

            if (
              !mediainfoData ||
              !mediainfoData.media ||
              !mediainfoData.media.track ||
              mediainfoData.media.track.length === 0
            ) {
              return;
            }
            var infoStream;
            var audioStreams = [];
            var videoStreams = [];
            var textStreams = [];
            var menuStreams = [];

            let data = mediainfoData.media.track;

            data.forEach((stream) => {
              if (!stream["@type"]) {
                return;
              }

              // Processing General stream
              if (stream["@type"] === "General") {
                var infoStreamTemplateObject = Object.assign(
                  {},
                  infoStreamTemplate
                );
                this.mapper(
                  stream,
                  infoStreamTemplateObject,
                  infoStreamPropertyTransformer
                );
                infoStream = infoStreamTemplateObject;
                return;
              }

              // Processing Video stream
              if (stream["@type"] === "Video") {
                var resultObject = Object.assign(
                  {},
                  commonStreamTemplate,
                  commonMediaStreamTemplate,
                  videoStreamTemplate
                );

                var resultTransformer = [].concat(
                  commonStreamPropertyTransformers,
                  commonMediaStreamPropertyTransformer,
                  videoStreamPropertyTransformer
                );

                this.mapper(stream, resultObject, resultTransformer);
                videoStreams.push(resultObject);
                return;
              }

              // Processing Audio stream
              if (stream["@type"] === "Audio") {
                var resultObject = Object.assign(
                  {},
                  commonStreamTemplate,
                  commonMediaStreamTemplate,
                  audioStreamTemplate
                );

                var resultTransformer = [].concat(
                  commonStreamPropertyTransformers,
                  commonMediaStreamPropertyTransformer,
                  audioStreamPropertyTransformer
                );

                this.mapper(stream, resultObject, resultTransformer);
                audioStreams.push(resultObject);
                return;
              }

              // Processing Text stream
              if (stream["@type"] === "Text") {
                var resultObject = Object.assign(
                  {},
                  commonStreamTemplate,
                  commonMediaStreamTemplate,
                  textStreamTemplate
                );

                var resultTransformer = [].concat(
                  commonStreamPropertyTransformers,
                  commonMediaStreamPropertyTransformer,
                  textStreamPropertyStreamTransfomer
                );

                this.mapper(stream, resultObject, resultTransformer);
                textStreams.push(resultObject);
                return;
              }

              // Processing Menu stream
              if (stream["@type"] === "Menu") {
                var resultObject = Object.assign(
                  {},
                  commonStreamTemplate,
                  menuStreamTemplate
                );

                var resultTransformer = [].concat(
                  commonStreamPropertyTransformers,
                  menuStreamPropertyTransformer
                );

                this.mapper(stream, resultObject, resultTransformer);
                menuStreams.push(resultObject);
                return;
              }
            });

            var postInfoStream = this.postProcessInfoStreams(infoStream);

            var combinedStreams = {
              infoStream: postInfoStream,
              audioStreams: audioStreams,
              videoStreams: videoStreams,
              textStreams: textStreams,
              menuStreams: menuStreams,
            };

            resolve(combinedStreams);
          } catch (parseError) {
            console.error("Error parsing the JSON output: ", parseError);
            reject(parseError);
          }
        }.bind(this)
      );
    });
  }
}

module.exports = MediaInfo;
