<template>
    <div>
        <span>{{ name }}</span>
        <span>{{ data }}</span>
    </div>
</template>

<script>
export default {
    name: "AdminMediaImageCard",
    props: {
        name: String,
        data: String
    }
}
</script>

<style scoped>
div {
    width: fit-content;
    width: 16%;
    padding: 1rem;
    background-color: #F4F4F4;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

span:nth-child(2) {
    font-size: 1.2rem;
}
</style>