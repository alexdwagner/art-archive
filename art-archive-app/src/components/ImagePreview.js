"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImagePreview = ({ file }) => {
    if (!file) {
        return No;
        image;
        to;
        preview < /div>;;
    }
    const src = URL.createObjectURL(file);
    return style = {};
    {
        display: 'flex',
            justifyContent;
        'center',
            alignItems;
        'center',
            width;
        '100%',
            height;
        '100%',
            backgroundColor;
        '#eee',
        ;
    }
};
    >
        src;
{
    src;
}
alt = "preview";
style = {};
{
    objectFit: 'contain',
        maxWidth;
    '100%',
        maxHeight;
    '100%',
        border;
    '1px solid #ccc',
    ;
}
onLoad = {}();
URL.revokeObjectURL(src);
/>
    < /div>;
;
;
exports.default = ImagePreview;
