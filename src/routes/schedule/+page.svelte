<script lang="ts">
    import { Button, Modal, Label } from 'flowbite-svelte';
    import { onMount } from 'svelte';

    interface MyEvent {
        name: string;
        contact: string;
        startDate: Date;
        endDate: Date;
    }

    let formModal = false; 
    let events: MyEvent[] = []; 
    let selectedStartDate = '';
    let selectedEndDate = '';
    let eventName = '';
    let contactNumber = '';
    let currentYear = new Date().getFullYear(); // Current year
    let currentMonthIndex = new Date().getMonth(); 
    let currentDay = new Date().getDate(); // Current day (1-31)
    let filter = 'all'; // State for filter selection

    function handleModalClose() {
        formModal = false;
    }

    function handleFormSubmit(e: SubmitEvent) {
        e.preventDefault(); 
        const newEvent: MyEvent = {
            name: eventName,
            contact: contactNumber,
            startDate: new Date(selectedStartDate),
            endDate: new Date(selectedEndDate),
        };
        events.push(newEvent); 
        console.log("Event created!", newEvent);
        handleModalClose(); 
        
        // Save to localStorage after adding a new event
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('events', JSON.stringify(events));
        }
    }

    function getEventsForDate(date: Date): MyEvent[] {
        return events.filter(event => {
            const eventStart = event.startDate.getTime();
            const eventEnd = event.endDate.getTime();
            const currentDate = date.getTime();
            return currentDate >= eventStart && currentDate <= eventEnd;
        });
    }

    function filterEvents(): MyEvent[] {
        if (filter === 'upcoming') {
            return events.filter(event => event.startDate > new Date());
        } else if (filter === 'past') {
            return events.filter(event => event.endDate < new Date());
        }
        return events; // Return all events if filter is 'all'
    }

    function updateMonth(event: Event) {
        const selectElement = event.target as HTMLSelectElement; // Type assertion for HTMLSelectElement
        const selectedMonthIndex = parseInt(selectElement.value);
        currentMonthIndex = selectedMonthIndex; 
    }

    onMount(() => {
        // Check if we're in a browser environment before accessing localStorage
        if (typeof window !== 'undefined') {
            const storedEvents = window.localStorage.getItem('events');
            if (storedEvents) {
                events = JSON.parse(storedEvents);
            }
        }
    });

    // Get the first day of the current month and the total number of days in the month
    function getCalendarDays() {
        const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonthIndex + 1, 0);
        const totalDays = lastDayOfMonth.getDate();
        const startDayIndex = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.

        // Create an array with empty slots for days before the first of the month
        const daysArray = new Array(startDayIndex).fill(null).concat(Array.from({ length: totalDays }, (_, i) => i + 1));
        return daysArray;
    }
</script>

<main class="flex-1 flex flex-col items-start justify-start p-[1.9rem] pl-[4.5rem] pt-[2rem]">
    <h1 class="text-5xl pb-2 pt-8">Events</h1>
    <div class="flex flex-col w-full">
        <div class="flex items-center mb-4 justify-between">
            <div class="flex items-center w-1/2 relative">
                <input
                    type="text"
                    placeholder="Search"
                    class="w-full p-2 pl-10 pr-10 border border-gray-300 rounded-lg bg-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-sky-400 font-bold h-10" 
                />
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"></i>
                
                <div class="relative ml-4">
                    <select on:change={e => filter = (e.target as HTMLSelectElement).value} class="p-2 border border-gray-300 rounded-lg bg-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-sky-400 pl-10 appearance-none font-bold h-10">
                        <option value="all">All</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                    </select>
                    <i class="fa-solid fa-filter absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"></i>
                </div>
            </div>
            <Button on:click={() => (formModal = true)} class="ml-6 flex items-center bg-[#003CFF] text-white p-4 rounded-lg hover:bg-[#1c2a58] focus:outline-none focus:ring-2 focus:ring-blue-400 h-10">
                <i class="fas fa-plus mr-2"></i>
                Create Event
            </Button>
        </div>

        <div class="grid grid-cols-7 gap-2 w-full h-[44rem] border-2 border-[#D9D9D9] rounded-lg p-6 bg-[#F5F5F5]">
            <div class="col-span-2">
                <h2 class="text-3xl font-semibold">Event Schedule</h2>
                <span class="text-lg">{new Date(currentYear, currentMonthIndex).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            </div>
            <div class="col-span-5 flex justify-end">
                <select on:change={updateMonth} class="border-2 border-[#D9D9D9] rounded-lg bg-[#F5F5F5] p-3 h-[48px] mt-1.5 text-black">
                    {#each Array.from({ length: 12 }, (_, i) => i) as monthIndex}
                        <option value={monthIndex} selected={monthIndex === currentMonthIndex}>
                            {new Date(currentYear, monthIndex).toLocaleString('default', { month: 'long' })}
                        </option>
                    {/each}
                </select>
            </div>
        
            <div class="col-span-7">
                <hr class="my-2 border-gray-300" />
            </div>
        
            <div class="text-center font-bold col-span-1">SUN</div>
            <div class="text-center font-bold col-span-1">MON</div>
            <div class="text-center font-bold col-span-1">TUE</div>
            <div class="text-center font-bold col-span-1">WED</div>
            <div class="text-center font-bold col-span-1">THU</div>
            <div class="text-center font-bold col-span-1">FRI</div>
            <div class="text-center font-bold col-span-1">SAT</div>
        
            {#each getCalendarDays() as day, index}
                <div class={`p-4 border border-gray-200 rounded-lg relative h-[5.5rem] flex flex-col items-center justify-center`}>
                    {#if day}
                        <span class="text-gray-600 font-semibold text-lg">{day}</span>
                        {#each getEventsForDate(new Date(currentYear, currentMonthIndex, day)) as event}
                            <div class="absolute top-8 left-0 bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                                {event.name}
                            </div>
                        {/each}
                    {/if}
                </div>
            {/each}
        </div>

        <Modal bind:open={formModal} size="sm" on:close={handleModalClose} class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div class="max-w-[488px] w-full bg-[#F5F5F5] h-[508px] p-[3rem] rounded-lg mt-20">
                <form class="flex flex-col space-y-6" on:submit={handleFormSubmit} on:click={e => e.stopPropagation()}>
                    <h3 class="mb-4 text-4xl font-medium text-slate-900">Create Event</h3>
                    
                    <Label class="space-y-2">
                        <input type="text" placeholder="Name" bind:value={eventName} required class="w-full border bg-[#D9D9D9] border-gray-300 rounded-lg p-2 pl-5 text-black" />
                    </Label>
                
                    <Label class="space-y-2">
                        <input type="number" placeholder="Contact Number" bind:value={contactNumber} required class="w-full border bg-[#D9D9D9] border-gray-300 rounded-lg p-2 pl-5 text-black" />
                    </Label>

                    <div class="flex space-x-4">
                        <Label class="flex-1 space-y-2">
                            <span class="text-sm text-gray-600">Start Date</span>
                            <input type="date" bind:value={selectedStartDate} required class="w-full border border-gray-300 bg-[#D9D9D9] rounded-lg p-2 text-black pl-4" />
                        </Label>
                        <Label class="flex-1 space-y-2">
                            <span class="text-sm text-gray-600">End Date</span>
                            <input type="date" bind:value={selectedEndDate} required class="w-full border border-gray-300 bg-[#D9D9D9] rounded-lg p-2 text-black pl-4" />
                        </Label>
                    </div>
                    
                    <Label class="space-y-2">
                        <select class="w-full p-2 border border-gray-300 rounded-lg bg-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-sky-400  appearance-none font-semi-bold text-black pl-4">
                            <option value="">Type of Event...</option>
                            <option value="event1">Event 1</option>
                            <option value="event2">Event 2</option>
                            <option value="event3">Event 3</option>
                        </select>
                    </Label>

                    <div class="flex justify-between">
                        <Button type="button" on:click={handleModalClose} class="flex-1 mr-2 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 p-2.5">
                            <i class="fas fa-times"></i> Cancel
                        </Button>
                        <Button type="submit" class="flex-1 ml-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 p-2.5">
                            <i class="fas fa-check"></i> Create Event
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    </div>
</main>

<style>
    .event { 
        /* Style for event here */ 
    }
</style>
