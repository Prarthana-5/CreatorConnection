
const profileForm = document.getElementById("profileForm");
const profileResult = document.getElementById("profileResult");

// Load previously saved profiles when the page opens
let profiles = JSON.parse(localStorage.getItem("creatorProfiles")) || [];

// Display saved profiles
function displayProfiles() {
    profileResult.replaceChildren();

    profiles.forEach(function (profile) {
        const card = document.createElement("div");
        card.className = "profile-card";

        const heading = document.createElement("h3");
        heading.textContent = profile.name + "'s Profile";
        card.appendChild(heading);

        const details = [
            ["Email", profile.email],
            ["User Type", profile.userType],
            ["Skills or Services", profile.skills || "Not provided"],
            ["About Me", profile.bio || "Not provided"],
            ["Collaboration Interests", profile.interests || "Not provided"]
        ];

        details.forEach(function (detail) {
            const paragraph = document.createElement("p");
            const label = document.createElement("strong");

            label.textContent = detail[0] + ": ";
            paragraph.appendChild(label);
            paragraph.appendChild(document.createTextNode(detail[1]));
            card.appendChild(paragraph);
        });

        profileResult.appendChild(card);
    });
}

// Save a new profile when the form is submitted
profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const profile = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        userType: document.getElementById("userType").value,
        skills: document.getElementById("skills").value.trim(),
        bio: document.getElementById("bio").value.trim(),
        interests: document.getElementById("interests").value.trim()
    };

    if (!profile.name || !profile.email || !profile.userType) {
        alert("Please fill in all required fields.");
        return;
    }

    // Avoid saving the same email more than once
    const emailExists = profiles.some(function (existingProfile) {
        return existingProfile.email.toLowerCase() ===
               profile.email.toLowerCase();
    });

    if (emailExists) {
        alert("A profile with this email already exists.");
        return;
    }

    profiles.push(profile);

    try {
        localStorage.setItem("creatorProfiles", JSON.stringify(profiles));
    } catch (error) {
        profiles.pop();
        alert("Unable to save the profile. Please check your browser storage.");
        return;
    }

    displayProfiles();
    profileForm.reset();

    profileResult.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});

// Show saved profiles immediately
displayProfiles();
