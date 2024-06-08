<script lang="ts">
    import MarkDown from "$lib/components/MarkDown.svelte";
    import {GetFilePathOnServer} from "$lib/util";
    import {onMount} from "svelte";
    import githubLogo from "$lib/assets/github-mark.svg";

    let files = new Array<string>();

    onMount(async () => {
        let url = GetFilePathOnServer("md/meta.json");
        let response = await fetch(url);
        files = await response.json();

        console.log(files);
    });
</script>

<style lang="css">
    #footer {
        position: fixed;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, -50%);
        margin: 0 auto;
        text-align: center;
    }

    #footer a img {
        height: 1em;
        width: 1em;
        vertical-align: middle; /* Aligns the image vertically with the text */
    }
</style>

<div class="app">
    {#each files as file}
        <MarkDown file={file} />
    {/each}

    <div id="footer">
        <p>The content of this site is provided by markdown files! Check it out on <a href="https://github.com/X-rays5/personal-site"><img src={githubLogo} alt="Github logo"/> Github.</a></p>
    </div>
</div>