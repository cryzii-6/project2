<script lang="ts">
    import "../app.css";

    let y = 0;
    let innerWidth = 0;
    let innerHeight = 0;

    // Updated tabs array with FontAwesome icons and labels
    let tabs = [
        { icon: "fa-solid fa-house", label: "Home", href: "./" },
        { icon: "fa-solid fa-calendar", label: "Schedule", href: "./schedule/" },
        { icon: "fa-solid fa-envelope", label: "Contact", href: "./contact/" },
    ];
</script>

<div class="flex h-screen flex-col md:flex-row">
    <header class="sidebar sticky top-0 z-[10] w-full md:w-64 px-4 md:px-6 py-3 md:py-8 flex flex-col md:flex-col md:items-center border-b md:border-b-0 md:border-r border-green-800 bg-[#DDD0D0]">
        <!-- Logo Section -->
        <div class="mb-4 md:mb-8 border border-black rounded-lg p-2 md:p-4 flex justify-center items-center">
            <i class="fa-solid fa-calendar-days text-3xl md:text-6xl text-slate-900"></i>
        </div>
        
        <!-- Navigation Links -->
        <nav class="flex flex-row md:flex-col items-center md:items-start w-full flex-grow space-x-2 md:space-x-0">
            {#each tabs as tab}
                <a href={tab.href} class="text-slate-700 text-sm md:text-base transition-colors duration-300 font-medium py-2 px-2 md:px-0 md:py-3 w-full flex items-center justify-center md:justify-start hover:bg-sky-400 hover:text-white rounded-md">
                    <i class={`${tab.icon} fa-lg md:fa-2x flex-shrink-0`}></i>
                    <span class="text-sm md:text-lg font-medium ml-1 md:ml-3 hidden md:inline">{tab.label}</span>
                </a>
            {/each}
        </nav>
    </header>
    <slot></slot>
</div>

<style>
    /* General sidebar styling */
    .sidebar {
        background-color: #DDD0D0;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .sidebar {
            width: 100%;
            height: auto;
            flex-direction: row;
            justify-content: space-between;
            padding: 8px;
            border-bottom: 1px solid #8b8b8b;
            border-right: none;
        }

        .sidebar a {
            justify-content: center;
            padding: 8px 0;
        }

        .sidebar a span {
            display: none; /* Hide labels to fit icon-only mode */
        }
    }

    @media (max-width: 640px) {
        .sidebar {
            flex-direction: row;
            padding: 8px;
        }

        .sidebar i {
            font-size: 1.25rem; /* Smaller icon size on very small screens */
        }
    }
</style>
