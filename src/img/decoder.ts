import * as _ from 'jimp';
import Palette, { Character, Color } from '../i/Palette';
import Response from '../i/Response';
import Settings from '../i/Settings';

export default class ImageDecoder {
    private key: Settings;
    private content: Response;
    private optionals = {
        headers: {
            isEditing: false,
            currentEditing: ""
        },
        index: 0
    };

    constructor(key: Settings) {
        this.key = key;
        this.content = { DATA: [], HEADERS: { COLUMNS: [] } };
    }

    /**
     * Get/Refresh the recieved content
     */
    readContents() {
        _.read(`${this.key.path}`, (err, img) => {
            if (err) throw new Error(err.message);

            for (let y = 1; y <= img.getHeight(); y++) {
                for (let x = 0; x <= img.getWidth(); x++) {
                    let colour = img.getPixelColor(x, y).toString(16);
                    this.tokenizeCharacter(this.findCharacter(`${colour}FF`).char);
                }
            }
        });
        return this.content;
    }

    protected findCharacter(colour: Color) {
        if (this.key.palette == undefined) throw new Error("Palette is undefined");
        let palette = this.key.palette;
        if (colour.toLowerCase() == palette.SPACE.toLowerCase()) return { char: "SPACE", color: palette.SPACE };
        if (colour.toLowerCase() == palette.OVERFLOW.toLowerCase()) return { char: "OVERFLOW", color: palette.OVERFLOW };
        if (colour.toLowerCase() == palette.HEADER.toLowerCase()) return { char: "HEADER", color: palette.HEADER };
        if (colour.toLowerCase() == palette.COLUMNS.toLowerCase()) return { char: "COLUMNS", color: palette.COLUMNS };

        let foundValue = palette.CHARACTERS?.find((pair) => pair.color.toLowerCase() == colour.toLowerCase())
        if (foundValue == undefined) {
            return { char: "WHITESPACE", color: "FFFFFFFF" };
        } else return foundValue;
    }

    protected tokenizeCharacter(character: string) {
        switch (character) {
            case "SPACE":

                break;
            case "OVERFLOW":
                break;
            case "HEADER":
                break;
            case "COLUMNS":
                break;
            default:
                break;
        }
    }
}