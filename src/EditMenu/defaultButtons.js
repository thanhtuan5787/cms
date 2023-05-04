const defaultButtons = {
    text: {
        icon: 'fas fa-font',
        label: 'Add Text',
        action: 'add',
        object: {
            kind: 'text',
            text: 'Your text here!',
            fontSize: '48px',
            color: 'black',
            size: {
                width: 200,
                height: 100,
            },
        },
    },
    button: {
        icon: 'fas fa-square',
        action: 'add',
        selector: 'button',
        label: 'Add Button',
        object: {
            kind: 'button',
            size: {
                width: 200,
                height: 50,
            },
            message: 'change me!',
}
    },
    image: {
        icon: 'fas fa-image',
        label: 'Add Image',
        action: 'add',
        object: {
            kind: 'image',
            size: {
                width: 100,
                height: 100,
            },
            imageUri:
                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
        },
    },

};

export default defaultButtons;
