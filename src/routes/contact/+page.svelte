<script lang="ts">
    import { Button, Modal, Label } from 'flowbite-svelte';
    let formModal = false; // Modal for the form

    // Function to handle form submission
    function handleFormSubmit(e: Event) {
        e.preventDefault(); // Prevent default form submission
        console.log("Form submitted!");
    }
</script>

<main class="flex flex-col items-start justify-start px-6 md:px-20 lg:px-[6.5rem] pt-16 w-full">
    <h1 class="text-3xl md:text-4xl lg:text-6xl pb-8 md:pb-10 pt-8">Contact Form</h1>

    <form class="flex flex-col space-y-6 w-full" on:submit={handleFormSubmit} on:click={e => e.stopPropagation()}>

        <!-- Name Input -->
        <Label class="flex flex-col w-full">
            <span class="text-md md:text-lg text-slate-900 mb-1">Name</span>
            <input type="text" class="w-full border border-gray-300 bg-[#F5F5F5] rounded-lg p-2 text-black" />
        </Label>

        <!-- Email Input -->
        <Label class="flex flex-col w-full">
            <span class="text-md md:text-lg text-slate-900 mb-1">Email</span>
            <input type="email" class="w-full border border-gray-300 bg-[#F5F5F5] rounded-lg p-2 text-black" />
        </Label>

        <!-- Phone Number Input -->
        <Label class="flex flex-col w-full">
            <span class="text-md md:text-lg text-slate-900 mb-1">Phone Number</span>
            <input type="tel" class="w-full border border-gray-300 bg-[#F5F5F5] rounded-lg p-2 text-black" />
        </Label>

        <!-- Reason for Contact Textarea -->
        <Label class="flex flex-col w-full">
            <span class="text-md md:text-lg text-slate-900 mb-1">Reason for Contact</span>
            <textarea class="w-full h-40 md:h-48 border border-gray-300 bg-[#F5F5F5] rounded-lg p-2 text-black"></textarea>
        </Label>

        <!-- Submit Button Aligned Right -->
        <div class="flex justify-end">
            <Button type="submit" class="mt-4 bg-[#003CFF] p-3 w-full md:w-[150px]">SUBMIT</Button>
        </div>
    </form>
</main>

<style>
    /* Ensure full-width inputs on smaller screens */
    @media (max-width: 640px) {
        input, textarea {
            width: 100%;
        }
    }
</style>
