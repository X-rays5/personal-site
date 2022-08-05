<script lang="ts">
    import {onMount} from "svelte";
    import {Prism} from "../prism.js";
    import {browser} from "$app/env"
    import {GetFilePathOnServer} from "../util";

    export let file = undefined;
    let markdown_content = "";

    function GetMarkDownPath(file: String): String | URL {
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

        marked.setOptions({
            highlight: (code, lang) => {
                if (Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                } else {
                    return code;
                }
            }
        })
        markdown_content = DOMPurify.sanitize(marked.parse(markdown_file));
    });
</script>

<div id={`md-${file}`}>
    {@html markdown_content}
</div>