'use strict';

const visit = require(`unist-util-visit`);

module.exports = ({ markdownAST }) => {
  /*
  function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null) return false;else return true;
  }
  */
  visit(markdownAST, `inlineCode`, node => {
    const { value } = node;

    if (value.startsWith(`amazon:`)) {
      const videoUrl = value.substr(7);
      const afiURL = videoUrl.match(/href="([^"]+)"/)[1];
      //if (isUrlValid(videoUrl)) {
        node.type = `html`;
        node.value = `<div style="display:flex;justify-content:center;"><div style="padding:20px;background:#CFE2CA;display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:5px;text-decoration:none;border-radius:4px;box-shadow: 0px 0px 0px 5px #CFE2CA;border:dashed 1px #FFF;">${videoUrl}<a style="width:80%;color:grey;background:white;font-weight:bold;border-radius:5px;text-align:center;padding:5px 10px;margin-top:5px;" href="${afiURL}">amazonで見る</a></div></div>`;
      //}
    }
  });

  return markdownAST;
};