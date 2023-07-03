<script lang="ts">
    import MarkDown from "$lib/components/MarkDown.svelte";
    import {GetFilePathOnServer} from "$lib/util";
    import {onMount} from "svelte";

    let files = [];

    onMount(async () => {
        let url = GetFilePathOnServer("md/meta.json");
        let response = await fetch(url);
        files = await response.json();

        console.log(files);
    });
</script>

<div>
    {#each files as file}
        <MarkDown file={file} />
    {/each}
</div>