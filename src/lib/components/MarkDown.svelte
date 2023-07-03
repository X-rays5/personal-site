<script lang="ts">
    import {onMount} from "svelte";
    import {GetFilePathOnServer} from "../util";
    import {marked} from "marked";
    import {markedHighlight} from "marked-highlight";
    import hljs from 'highlight.js';

    export let file = undefined;
    let markdown_content = "";

    function GetMarkDownPath(file: String): String | URL | undefined {
        if (file === undefined) {
            return undefined;
        }

        return GetFilePathOnServer(`md/${file}`);
    }

    async function LoadMarkdown(path: String | URL): Promise<String> {
        if (path === undefined) {
            return `# No markdown file path provided`;
        }

        try {
            const response = await fetch(path);
            return await response.text();
        } catch (error) {
            return `# Error loading markdown file: ${error}`;
        }
    }

    onMount(async () => {
        console.log(file);
        const markdown_file = await LoadMarkdown(GetMarkDownPath(file));

        marked.use(markedHighlight({
            langprefix: 'hljs language-',
            highlight: function (code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            }
        }));
        markdown_content = marked.parse(markdown_file);
        console.log(markdown_content)
    });
</script>

<div id={`md-${file}`}>
    {@html markdown_content}
</div>

<style>
    code {
        background: grey;
    }
</style>
