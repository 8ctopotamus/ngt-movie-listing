import BBCodeParser from 'bbcode-parser'
import BBTag from 'bbcode-parser/bbTag'

// get the default tags
const defaultTags = new BBCodeParser(BBCodeParser.defaultTags())

// add custom tags
defaultTags.bbTags["p"] = new BBTag("p", true, false, false);

defaultTags.bbTags["large"] = BBTag.createSimpleTag('span style="font-size: large;"', function (tag, content, attr) {
	return  `<span>${content}</span>`;
});

export default new BBCodeParser(defaultTags.bbTags)
