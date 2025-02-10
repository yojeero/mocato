<img src="preview/git.png">

### [Mocato](https://mocato.vercel.app/) - Tailwind v4 Template ###

- Tailwind CSS v4
- Can use Tailwind via CDN
- HTML5, CSS3
- Inline SVG icons 
- Local Google Fonts
- Radio player via Vanilla JS
- Fully responsive layout
- Vite build config
- Ready production Tailwind HTML site in the "public" folder

```
Tailwind CSS v4 

Don't need tailwind.config anymore.
Just use > @import "tailwindcss"; < in your .css

---------------------

Use Tailwind via CDN without Build Tools like Vite, Bun, Nx and so on ...
Look at https://risingstars.js.org/2023/en#section-build

Insert <script src="https://unpkg.com/@tailwindcss/browser@4"></script> to the <head> of your HTML file, and start using Tailwind to style your content.  
```

After building in Vite

Need to remove >crossorigin< in "index.html" at the "head" section. 

```
At line <link rel="stylesheet" crossorigin href="css/style.css">  

Correct to <link rel="stylesheet" href="css/style.css">  
```

-- All images are for demonstration purposes only. --


