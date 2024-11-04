<script lang="ts">
    import "../app.css";

    let y = 0;
    let innerWidth = 0;
    let innerHeight = 0;

    // Updated tabs array with FontAwesome icons and labels
    let tabs = [
    { icon: "fa-solid fa-house", label: "Home", href: "./" },  // Relative to current location
    { icon: "fa-solid fa-calendar", label: "Schedule", href: "./schedule/" },
    { icon: "fa-solid fa-envelope", label: "Contact", href: "./contact/" },
];

</script>

<div class="flex h-screen">
    <!-- Sidebar / Navbar -->
    <header class={`sticky top-0 z-[10] h-full w-64 px-6 py-8 flex flex-col items-center border-r border-green-800 bg-[#DDD0D0]`}>
        <!-- Logo Section with Icon -->
        <div class="mb-8 border border-black rounded-lg p-4 flex justify-center items-center"> 
            <i class="fa-solid fa-calendar-days text-6xl text-slate-900"></i>
        </div>

        <!-- Separator Line -->
        <div class="w-full h-1 bg-[#a39696] mb-4"></div>

        <!-- Navigation Links -->
        <nav class="flex flex-col items-start w-full flex-grow">
            {#each tabs as tab}
                <a href={tab.href} class="text-slate-700 text-lg transition-colors duration-300 font-medium py-3 w-full flex items-center hover:bg-sky-400 hover:text-white rounded-md">
                    <i class={`${tab.icon} fa-2x flex-shrink-0 ml-5 mr-3`}></i>
                    <span class="text-lg font-medium flex-1">{tab.label}</span>
                </a>
            {/each}
        </nav>
    </header>

    <main class="flex-grow">
        <slot></slot>
    </main>
</div>
