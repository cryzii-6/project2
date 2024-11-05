<main class="flex-1 flex flex-col items-start justify-start p-[4rem] md:p-[8rem] lg:p-[12rem] pl-[2rem] md:pl-[6rem] lg:pl-[9rem]">
    <div class="flex flex-col lg:justify-center text-left gap-4 md:gap-6 lg:gap-8">
        <h1 class="text-slate-900 font-medium text-4xl sm:text-6xl md:text-7xl lg:text-8xl pr-2 md:pr-4 lg:pr-1 mb-2 mt-2 ml-4 hover:text-blue-500 transition-transform duration-300 hover:scale-105">
            Welcome to our <br>
            <span class="mt-1 block hover:text-[#003CFF] transition-all duration-300">Website!</span>
        </h1>
        <p class="text-left ml-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal hover:text-gray-700 transition-transform duration-300 hover:scale-105">
            Plan and manage your events with ease.<br> Let's make your next gathering unforgettable!
        </p>
    </div>
</main>

<style>
    /* Responsiveness for /Route */
    @media (max-width: 1024px) {
        main {
            padding: 3rem 4rem;
        }
        h1 {
            font-size: 3.5rem;
        }
        p {
            font-size: 1.75rem;
        }
    }
    @media (max-width: 768px) {
        main {
            padding: 2rem 3rem;
            padding-left: 1.5rem;
        }
        h1 {
            font-size: 2.75rem;
            padding-right: 1rem;
        }
        p {
            font-size: 1.25rem;
        }
    }
    @media (max-width: 640px) {
        main {
            padding: 1.5rem;
            padding-left: 1rem;
        }
        h1 {
            font-size: 2.25rem;
            padding-right: 0.5rem;
            margin-bottom: 1rem;
            margin-top: 1rem;
            margin-left: 0.5rem;
        }
        p {
            font-size: 1rem;
            margin-left: 0.5rem;
        }
    }

    /* Hover Effects */
    h1:hover {
        color: #003CFF; /* Blue color on hover */
        transform: scale(1.05); /* Slight scale up */
    }
    h1 span:hover {
        color: #FF007F; /* Different color for span on hover */
        font-weight: bold; /* Emphasize "Website!" on hover */
    }
    p:hover {
        color: #4B5563; /* Gray-700 color on hover */
        transform: scale(1.05); /* Slight scale up */
    }
</style>
