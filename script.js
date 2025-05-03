let currentScore = 0;
let mistakes = 0;
let currentStep = 0;
let currentScenario = null;

const categories = [
    { type: 'weather', icon: '⚠️', name: 'Weather Delays' },
    { type: 'medical', icon: '🚑', name: 'Medical' },
    { type: 'mechanical', icon: '❄️', name: 'HVAC' },
    { type: 'hazardous', icon: '☣️', name: 'Biohazard' },
    { type: 'wildlife', icon: '🐻', name: 'Wildlife Safety' },
    { type: 'service', icon: '👥', name: 'Service Recovery' },
    { type: 'narration', icon: '🎙️', name: 'Narration Challenges' },
    { type: 'difficult_passenger', icon: '😤', name: 'Difficult Passengers' },
    { type: 'wildlife_excitement', icon: '📸', name: 'Wildlife Viewing' },
    { type: 'weather_questions', icon: '🌤️', name: 'Weather Concerns' },
    { type: 'lost_item', icon: '🔍', name: 'Lost Items' },
    { type: 'schedule_confusion', icon: '🕒', name: 'Schedule Issues' },
    { type: 'photo_requests', icon: '📷', name: 'Photo Management' },
    { type: 'tech_failure', icon: '🎛️', name: 'Technical Issues' },
    { type: 'medical_emergency', icon: '🏥', name: 'Medical Emergencies' },
    { type: 'restroom_malfunction', icon: '🚽', name: 'Facility Issues' },
    { type: 'safety_breach', icon: '⚠️', name: 'Safety Violations' },
    { type: 'catering_delay', icon: '🍽️', name: 'Catering & Events' },
    { type: 'valuable_lost_item', icon: '💎', name: 'Valuable Lost Items' },
    { type: 'facility_maintenance', icon: '🧹', name: 'Facility Maintenance' },
    { type: 'dining_service', icon: '🤔', name: 'Slow Diner' },
    { type: 'dining_service_hangry', icon: '😤', name: 'Dining Delay' },
    { type: 'dining_service_service', icon: '💰', name: 'Not Worth the Price' },
    { type: 'dining_service_mechanical', icon: '🔒', name: 'Restroom Lock' },
    { type: 'facility_maintenance_02', icon: '🚽', name: 'Restroom Odor' },
    { type: 'schedule_confusion_02', icon: '🕒', name: 'Unscheduled Delay' },
    { type: 'emergency_scenarios', icon: '⚠️', name: 'Multi-Crisis Management' },
    { type: 'dino', icon: '🦖', name: 'Dinosaur Train' },
    { type: 'language_barrier', icon: '🌐', name: 'Language Barrier' },
    { type: 'disruptive_passenger', icon: '🤪', name: 'Disruptive Passenger' },
    { type: 'luggage_missing', icon: '🧳', name: 'Luggage Missing' },
    { type: 'serviceQuality', icon: '👨‍✈️', name: 'Service Quality' },
    { type: 'punctualityDelays', icon: '⏰', name: 'Punctuality/Delays' },
    { type: 'safetyCleanliness', icon: '🧼', name: 'Safety/Cleanliness' },
    { type: 'foodDining', icon: '🍽️', name: 'Food/Dining' },
    { type: 'onboardAmenities', icon: '💺', name: 'Onboard Amenities' },
    { type: 'narrationCommentary', icon: '🎙️', name: 'Commentary' },
    { type: "security", icon: "🚨", name: "Security" },
    { type: "mechanical_02", icon: "🔧", name: "Mechanical Issues" },
    { type: "ticketing", icon: "🎫", name: "Ticketing" },
    { type: "baggage", icon: "🧳", name: "Baggage/Equipment" },
    { type: "mod", icon: "⚡", name: "Emergency/MOD" }

];

// Ensure the DOM is fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories');

    if (!categoriesContainer) {
        console.error("ERROR: Could not find categories container in the DOM.");
        return;
    }

    categories.forEach(category => {
        const div = document.createElement('div');
        div.className = 'train-car';
        div.setAttribute('data-type', category.type);
        div.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <div>${category.name}</div>
        `;
        div.addEventListener('click', () => showScenario(category.type));
        categoriesContainer.appendChild(div);
    });
});

const scenarios = {
     weather: [
        {
            title: "Your train is stopped due to avalanche risk ahead, with no estimated clearance time.",
            text: "Extended Weather Delay: Your train is stopped due to avalanche risk ahead, with no estimated clearance time.",
            steps: [
                {
                    question: "The train comes to an unexpected stop in the lush green landscape of the Alaskan summer, passengers crowd the windows, straining to see the cause of the delay. The conductor's voice crackles over the Radio channel, explaining that despite the warm, sunny day, there's an avalanche risk ahead due to recent heavy rains destabilizing the mountainside. Outside, the vibrant wildflowers and dense foliage of the short but intense Alaskan summer create a stark contrast to the potential danger lurking unseen on the steep slopes above the tracks:",
                    options: [
                        { text: "Wait for passengers to start asking questions", correct: false },
                        { text: "Tell passengers to look outside and figure it out", correct: false },
                        { text: "Make detailed PA announcement explaining situation and next steps", correct: true },
                        { text: "Begin immediate evacuation procedures", correct: false }
                    ]
                },
                {
                    question: "You have made a detailed PA announcement. What's your next step?",
                    options: [
                        { text: "Start planning alternative transportation", correct: false },
                        { text: "Start a snowball fight competition", correct: false },
                        { text: "Tell passengers to conserve their personal snacks", correct: false },
                        { text: "Coordinate with conductor on contacting Dispatch and the PASS OPS MOD", correct: true }
                    ]
                },
                {
                    question: "After assessing supplies and coordinating with the conductor, you should:",
                    options: [
                        { text: "Wait for conditions to improve", correct: false },
                        { text: "Monitor heat, restroom facilities, and provide regular updates every 30 minutes", correct: true },
                        { text: "Organize a betting pool on delay duration", correct: false },
                        { text: "Ask passengers to share their supplies", correct: false }
                    ]
                },
                {
                    question: "While maintaining regular updates and monitoring facilities, what's next?",
                    options: [
                        { text: "Start writing apology letters", correct: false },
                        { text: "Become their personal tour guide", correct: false },
                        { text: "Continue to communicate with conductor and the PASS OPS MOD to coordinate a plan", correct: true },
                        { text: "Tell passengers to handle their own travel changes", correct: false }
                    ]
                },
                {
                    question: "After continuing to communicate with conductor and the PASS OPS MOD, you need to:",
                    options: [
                        { text: "Hand out 'I Survived' certificates", correct: false },
                        { text: "Start a passenger talent show", correct: false },
                        { text: "Tell them to file insurance claims", correct: false },
                        { text: "Implement service recovery protocols with the Dining Captain including meal service adjustments", correct: true }
                    ]
                }
            ],
        }
    ],
medical: [
        {
            title: "An elderly passenger is experiencing altitude sickness symptoms between Talkeetna and Denali.",
            text: "Remote Medical Emergency: An elderly passenger is experiencing altitude sickness symptoms between Talkeetna and Denali.",
            steps: [
                {
                    question: "The train's ascent towards North America's highest peak has triggered an unexpected medical emergency, challenging the crew to manage a delicate situation while continuing the journey through remote terrain:",
                    options: [
                        { text: "Begin evacuation procedures immediately", correct: false },
                        { text: "Tell them they should have prepared better", correct: false },
                        { text: "Contact conductor and check for medical professionals onboard", correct: true },
                        { text: "Start basic first aid without notification", correct: false }
                    ]
                },
                {
                    question: "After contacting conductor and identifying medical professionals, you should:",
                    options: [
                        { text: "Start filming for social media", correct: false },
                        { text: "Retrieve medical kit and coordinate with medical professionals present", correct: true },
                        { text: "Make general PA announcement about medical emergency", correct: false },
                        { text: "Move patient to different car without assessment", correct: false }
                    ]
                },
                {
                    question: "With medical kit and professionals assisting, your next step is:",
                    options: [
                        { text: "Tell stories about previous medical emergencies", correct: false },
                        { text: "Ask other passengers for medication", correct: false },
                        { text: "Establish clear communication channel with conductor and PASS OPS MOD for updates", correct: true },
                        { text: "Continue regular service schedule", correct: false }
                    ]
                },
                {
                    question: "While maintaining communication with conductor and PASS OPS MOD, you should:",
                    options: [
                        { text: "Take photos for incident report", correct: false },
                        { text: "Prepare transfer to another car", correct: false },
                        { text: "Monitor vital signs and document all symptoms and actions", correct: true },
                        { text: "Ask patient to sign liability waiver", correct: false }
                    ]
                },
                {
                    question: "After stabilizing the situation, you need to:",
                    options: [
                        { text: "Tell patient to contact their insurance", correct: false },
                        { text: "Create detailed incident report including all medical actions taken", correct: true },
                        { text: "Share story with other passengers", correct: false },
                        { text: "Suggest they visit doctor after trip", correct: false }
                    ]
                }
            ]
        }
    ],
 mechanical: [
        {
            title: "Car E has lost HVAC during a 80°F day near Hurricane Gulch.",
            text: "Car E has lost HVAC during a 80°F day near Hurricane Gulch.",
            steps: [
                {
                    question: " Passengers in Car E suddenly find themselves sweltering in the unexpected 80°F heat. The majestic 296-foot-high Hurricane Gulch Bridge looms ahead, but the awe-inspiring views are overshadowed by the rising discomfort in the HVAC-less car. Excited chatter about the upcoming crossing of the tallest bridge on the Alaska Railroad is now punctuated by the sound of makeshift fans and worried murmurs about the stifling temperature, you should:",
                    options: [
                        { text: "Begin immediate unplanned evacuation", correct: false },
                        { text: "Locate the HVAC controls and run through a diagnostic, check if 'Forced Cooling' is an option", correct: true },
                        { text: "Suggest passengers start to shed layers", correct: false },
                        { text: "Tell passengers to find cool spots", correct: false }
                    ]
                },
                {
                    question: "After running through a diagnostic, 'Forced Cooling' is not connected and you see a series of fault codes displayed, next you should:",
                    options: [
                        { text: "Create a lottery for cool seats", correct: false },
                        { text: "Tell everyone to grab belongings and run", correct: false },
                        { text: "Cycle power to the controls to see if the fault codes clear", correct: true },
                        { text: "Move most vocal passengers first", correct: false }
                    ]
                },
                {
                    question: "After cycling the power the faults are no longer showing, but the temperture in the car is still too high, next step is:",
                    options: [
                        { text: "Tell passengers to carry everything themselves", correct: false },
                        { text: "Tell them to open the windows", correct: false },
                        { text: "Leave baggage for later retrieval", correct: false },
                        { text: "Lower the 'SET TEMP' value on the controls by no more than 3-5 degrees at a time", correct: true }
                    ]
                },
                {
                    question: "After beginning to lower the 'SET TEMP' value, you should:",
                    options: [
                        { text: "Start shedding your own extra layers", correct: false },
                        { text: "Continue to monitor the car and make sure the HVAC continues to operate", correct: true },
                        { text: "Tell passengers to file complaints online", correct: false },
                        { text: "Start planning future seating arrangements", correct: false }
                    ]
                },
                {
                    question: "While continueing to monitor the car, the final step is:",
                    options: [
                        { text: "Write amusing story about incident", correct: false },
                        { text: "Start temperature logging", correct: false },
                        { text: "Coordinate with conductor on the 238 REPORT and your own TRIP REPORT", correct: true },
                        { text: "Consider situation resolved", correct: false }
                    ]
                }
            ]
        }
    ],
hazardous: [
        {
            title: "Multiple 'BLUE WAVES' in Car C during full-capacity summer tour.",
            text: "Biohazard Incident: Multiple toilets have malfunctioned in Car C during full-capacity summer tour.",
            steps: [
                {
                    question: "A critical situation has arisen on a packed summer tour train as multiple toilets in Car C have malfunctioned, creating a potential biohazard incident that requires immediate attention and careful management, you should:",
                    options: [
                        { text: "Tell passengers to wait for next stop", correct: false },
                        { text: "Suggest using scenic viewpoints", correct: false },
                        { text: "Don PPE and shut the fill valve to stop the flow of water", correct: true },
                        { text: "Place out-of-order signs only", correct: false }
                    ]
                },
                {
                    question: "After shutting off the water, you should:",
                    options: [
                        { text: "Create VIP bathroom passes", correct: false },
                        { text: "Open the drain valve to lower the water in the toilet", correct: true },
                        { text: "Use standard cleaning supplies", correct: false },
                        { text: "Close car doors and wait", correct: false }
                    ]
                },
                {
                    question: "With containment underway, next step is:",
                    options: [
                        { text: "Wait for next station", correct: false },
                        { text: "Tell passengers to reduce liquid intake", correct: false },
                        { text: "Start bathroom trivia contest", correct: false },
                        { text: "Coordinate facility access with other cars while you clean up", correct: true }
                    ]
                },
                {
                    question: "While managing facility access, you need to:",
                    options: [
                        { text: "Create alternate facility plan", correct: false },
                        { text: "Monitor passenger comfort and provide regular updates", correct: true },
                        { text: "Write humorous announcements", correct: false },
                        { text: "Tell passengers to be patient", correct: false }
                    ]
                },
                {
                    question: "After situation is contained, final step is:",
                    options: [
                        { text: "Share funny stories about incident", correct: false },
                        { text: "Coordinate with conductor on the 238 REPORT and your own TRIP REPORT", correct: true },
                        { text: "Hope it doesn't happen again", correct: false },
                        { text: "Tell maintenance to fix it", correct: false }
                    ]
                }
            ]
        }
    ],
wildlife: [
        {
            title: "Multiple passengers attempting to exit train to photograph a brown bear and cubs during mechanical delay.",
            text: "Wildlife Encounter: Multiple passengers attempting to exit train to photograph a brown bear and cubs during mechanical delay.",
            steps: [
                {
                    question: "A tense situation unfolds as the train comes to an unexpected halt due to a mechanical issue, and passengers spot a brown bear with cubs nearby, prompting several excited individuals to attempt exiting the train for a closer look and photograph, despite the potential danger, you should:",
                    options: [
                        { text: "Tell them to use zoom lenses", correct: false },
                        { text: "Secure all doors and make clear safety announcement", correct: true },
                        { text: "Allow supervised photo opportunities", correct: false },
                        { text: "Sell wildlife photo packages", correct: false }
                    ]
                },
                {
                    question: "After securing doors and making announcement, you should:",
                    options: [
                        { text: "Create photo viewing schedule", correct: false },
                        { text: "Show bear safety videos", correct: false },
                        { text: "Position tour guides and Specialists at exits and coordinate with conductor", correct: true },
                        { text: "Start wildlife photography contest", correct: false }
                    ]
                },
                {
                    question: "With exits secured and crew positioned, next step is:",
                    options: [
                        { text: "Tell dramatic bear encounter stories", correct: false },
                        { text: "Document all passenger compliance issues", correct: false },
                        { text: "Organize bear-watching party", correct: false },
                        { text: "Provide clear explanation of wildlife safety protocols", correct: true }
                    ]
                },
                {
                    question: "While maintaining safety protocols, you need to:",
                    options: [
                        { text: "Create wildlife bingo game", correct: false },
                        { text: "Monitor situation and update conductor regularly", correct: true },
                        { text: "Take photos for passengers", correct: false },
                        { text: "Plan future wildlife stops", correct: false }
                    ]
                },
                {
                    question: "After situation is resolved, final step is:",
                    options: [
                        { text: "Plan better photo opportunities", correct: false },
                        { text: "Tell passengers to be ready next time", correct: false },
                        { text: "Document incident in your own TRIP REPORT", correct: true },
                        { text: "Share best wildlife photos", correct: false }
                    ]
                }
            ]
        }
    ],
service: [
        {
            title: "Multiple passengers complaining about slow bar service and food quality in dining car.",
            text: "Food Service Issues: Bar service complaints escalating to dining car concerns during peak meal time.",
            steps: [
                {
                    question: "As the train winds through scenic landscapes, tensions rise in the crowded dining car as frustrated passengers, already agitated by slow bar service, voice their growing discontent over meal delays and perceived staff shortcomings, creating a challenging atmosphere for the overwhelmed crew during the busiest dining hour of the journey:",
                    options: [
                        { text: "Tell bartender to work faster", correct: false },
                        { text: "Start happy hour specials", correct: false },
                        { text: "Assess current bar staffing and service patterns, coordinate with Dining Captain", correct: true },
                        { text: "Tell passengers the bar is usually busy", correct: false }
                    ]
                },
                {
                    question: "After assessing bar service patterns, you should:",
                    options: [
                        { text: "Close the bar temporarily", correct: false },
                        { text: "Implement immediate service adjustments and communicate with passengers", correct: true },
                        { text: "Offer free drinks to complainers", correct: false },
                        { text: "Tell passengers to order less complicated drinks", correct: false }
                    ]
                },
                {
                    question: "With bar service being addressed, dining room complaints begin. Your next step is:",
                    options: [
                        { text: "Blame the kitchen staff", correct: false },
                        { text: "Tell passengers to be patient", correct: false },
                        { text: "Consult with Dining Captain", correct: true },
                        { text: "Reduce menu options", correct: false }
                    ]
                },
                {
                    question: "After consulting with Dining Captain, you need to:",
                    options: [
                        { text: "Create excuses for the delays", correct: false },
                        { text: "Coordinate with Dining Captain to improve timing", correct: true },
                        { text: "Tell passengers to order simpler meals", correct: false },
                        { text: "Suggest passengers eat at their seats", correct: false }
                    ]
                },
                {
                    question: "With service coordination improving, final step is:",
                    options: [
                        { text: "Hope the complaints stop", correct: false },
                        { text: "Tell crew to just work faster", correct: false },
                        { text: "Document service issues and adjustments made for your TRIP REPORT", correct: true },
                        { text: "Offer free desserts to everyone", correct: false }
                    ]
                }
            ]
        }
    ],
narration: [
        {
            title: "You've lost your place in the script during a key scenic moment near Denali (Mt. McKinley).",
            text: "Narration Challenge: Multiple passengers are taking photos and asking questions about Denali (Mt. McKinley), but you've lost your place in the script.",
            steps: [
                {
                    question: "As the train rounds a bend, revealing a breathtaking vista of Denali's (Mt. McKinley's) snow-capped peak, the guide's mind goes blank, leaving them fumbling for words and struggling to recall the well-rehearsed script about North America's tallest mountain, what is your initial response:",
                    options: [
                        { text: "Make up random facts about the mountain", correct: false },
                        { text: "Pause narration and check your phone", correct: false },
                        { text: "Share general knowledge while finding your place in script", correct: true },
                        { text: "Tell passengers you're new and don't know", correct: false }
                    ]
                },
                {
                    question: "After sharing general knowledge, you should:",
                    options: [
                        { text: "Ask another guide to take over", correct: false },
                        { text: "Reference memorized quick facts while continuing", correct: true },
                        { text: "Skip that section entirely", correct: false },
                        { text: "Tell passengers to Google it", correct: false }
                    ]
                },
                {
                    question: "With quick facts covered, next step is:",
                    options: [
                        { text: "Rush through the missed content", correct: false },
                        { text: "Make jokes about being lost", correct: false },
                        { text: "Resume normal script with smooth transition", correct: true },
                        { text: "Ask passengers to share their knowledge", correct: false }
                    ]
                },
                {
                    question: "To maintain engagement, you need to:",
                    options: [
                        { text: "Skip remaining scenic points", correct: false },
                        { text: "Monitor passenger interest and adjust delivery", correct: true },
                        { text: "Speed through remaining script", correct: false },
                        { text: "End narration early", correct: false }
                    ]
                },
                {
                    question: "For future narration segments:",
                    options: [
                        { text: "Skip difficult sections", correct: false },
                        { text: "Review and mark key points in script", correct: true },
                        { text: "Memorize entire script", correct: false },
                        { text: "Avoid passenger questions", correct: false }
                    ]
                }
            ]
        }
    ],
 difficult_passenger: [
        {
            title: "A passenger is repeatedly interrupting your narration with incorrect 'facts'.",
            text: "Challenging Guest: Adult passenger keeps interrupting narration to share incorrect information loudly.",
            steps: [
                {
                    question: "The tour guide's well-rehearsed narration is repeatedly derailed by a boisterous passenger who confidently proclaims, 'Actually, you can't drive to Alaska, it's an island...' causing confused murmurs among other travelers and testing the guide's patience and professionalism, you should:",
                    options: [
                        { text: "Ignore the interruptions completely", correct: false },
                        { text: "Politely acknowledge and tactfully correct misinformation", correct: true },
                        { text: "Tell passenger to be quiet", correct: false },
                        { text: "Argue about who's right", correct: false }
                    ]
                },
                {
                    question: "After tactfully correcting misinformation, you should:",
                    options: [
                        { text: "Encourage passenger to share stories during breaks", correct: true },
                        { text: "Speed up your narration", correct: false },
                        { text: "Move to a different car", correct: false },
                        { text: "Call the conductor", correct: false }
                    ]
                },
                {
                    question: "If interruptions continue, next step is:",
                    options: [
                        { text: "Stop narrating entirely", correct: false },
                        { text: "Ask other passengers to help", correct: false },
                        { text: "Consult with 2nd Year tour guide or OBS for assistance", correct: true },
                        { text: "Tell passenger they're ruining the trip", correct: false }
                    ]
                },
                {
                    question: "To maintain service quality, you should:",
                    options: [
                        { text: "Ignore all passenger comments", correct: false },
                        { text: "Continue professional narration while monitoring situation", correct: true },
                        { text: "Argue with the passenger", correct: false },
                        { text: "Skip remaining commentary", correct: false }
                    ]
                },
                {
                    question: "Final step in managing difficult passenger:",
                    options: [
                        { text: "Avoid the passenger completely", correct: false },
                        { text: "Document incident and any actions taken", correct: true },
                        { text: "Tell other passengers to ignore them", correct: false },
                        { text: "Cancel remaining narration", correct: false }
                    ]
                }
            ]
        }
    ],
 wildlife_excitement: [
{
title: "Multiple young passengers running between cars after spotting a moose, one child with untied shoes.",
text: "Wildlife Safety: Children running between cars excitedly after wildlife sighting, with one child having untied shoelaces.",
steps: [
{
question: "The peaceful train journey suddenly erupts into a flurry of excitement as children dash between cars, their faces pressed against windows, after spotting a majestic moose in the wilderness, while one eager youngster, oblivious to his dangling shoelaces, stumbles in his haste to join the impromptu wildlife watch:",
options: [
{ text: "Join the excitement and point", correct: false },
{ text: "Make safety announcement about proper movement and untied shoelaces", correct: true },
{ text: "Tell children to sit down", correct: false },
{ text: "Ignore the behavior", correct: false }
]
},
{
question: "After safety announcement, you should:",
options: [
{ text: "Continue regular narration", correct: false },
{ text: "Ask parents to control their kids and tie shoelaces", correct: false },
{ text: "Guide organized viewing from safe positions and address untied shoes", correct: true },
{ text: "Close the blinds", correct: false }
]
},
{
question: "While managing viewing, next step is:",
options: [
{ text: "Share wildlife facts, safety tips, and importance of tied shoelaces", correct: true },
{ text: "Take photos for the children", correct: false },
{ text: "Promise more wildlife sightings", correct: false },
{ text: "Start a wildlife spotting contest", correct: false }
]
},
{
question: "With excitement managed, you need to:",
options: [
{ text: "Resume regular service duties", correct: false },
{ text: "Monitor continued passenger movement, behavior, and shoe status", correct: true },
{ text: "Let children run again", correct: false },
{ text: "End all wildlife viewing", correct: false }
]
},
{
question: "For future wildlife sightings, you should:",
options: [
{ text: "Ignore all wildlife", correct: false },
{ text: "Establish clear viewing guidelines and shoe safety for remainder of journey", correct: true },
{ text: "Allow unlimited movement", correct: false },
{ text: "Close all blinds", correct: false }
]
}
]
}
],
weather_questions: [
        {
            title: "Passengers concerned about dark clouds ahead affecting their outdoor activities.",
            text: "Weather Concerns: Multiple questions about weather impact on upcoming excursions.",
            steps: [
                {
                    question: "As the train winds through picturesque landscapes, passengers eagerly anticipate their upcoming outdoor adventures, but a collective murmur of concern rises as ominous dark clouds loom on the horizon, threatening to dampen their plans:",
                    options: [
                        { text: "Tell them to check their weather apps", correct: false },
                        { text: "Promise the weather will clear up", correct: false },
                        { text: "Share official weather updates and general guidelines", correct: true },
                        { text: "Ignore weather questions", correct: false }
                    ]
                },
                {
                    question: "After sharing weather updates, you should:",
                    options: [
                        { text: "Suggest canceling activities", correct: false },
                        { text: "Provide relevant activity operator contacts", correct: true },
                        { text: "Tell them to hope for the best", correct: false },
                        { text: "Make up alternative activities", correct: false }
                    ]
                },
                {
                    question: "While handling concerns, next step is:",
                    options: [
                        { text: "Share Alaska weather facts and tips", correct: true },
                        { text: "Start weather betting pool", correct: false },
                        { text: "Blame climate change", correct: false },
                        { text: "Tell stories about worse weather", correct: false }
                    ]
                },
                {
                    question: "To address ongoing concerns, you need to:",
                    options: [
                        { text: "Monitor updated weather reports", correct: true },
                        { text: "Tell passengers to stop worrying", correct: false },
                        { text: "Make weather predictions", correct: false },
                        { text: "Cancel all activities", correct: false }
                    ]
                },
                {
                    question: "Final step for weather situation:",
                    options: [
                        { text: "Ignore further questions", correct: false },
                        { text: "Coordinate with excursion providers on contingency plans", correct: true },
                        { text: "Promise perfect weather", correct: false },
                        { text: "Blame the weather service", correct: false }
                    ]
                }
            ]
        }
    ],
lost_item: [
        {
            title: "Young child has lost their favorite toy somewhere on the train.",
            text: "Lost Item: Upset child has lost special toy, parent requesting immediate help.",
            steps: [
                {
                    question: "Amidst the scenic vistas of snow-capped mountains and verdant forests, a frantic parent approaches the train staff, urgently seeking assistance. Their child's cherished toy - a well-worn stuffed moose that has been a constant companion on their Alaskan adventure - has mysteriously vanished somewhere between cars. The child's inconsolable sobs are drawing concerned glances from nearby passengers, while the parent's increasing anxiety threatens to disrupt the serene atmosphere of the journey:",
                    options: [
                        { text: "Tell them to look for it themselves", correct: false },
                        { text: "Gather specific details about item and last known location", correct: true },
                        { text: "Promise to replace the toy", correct: false },
                        { text: "Say it's probably gone forever", correct: false }
                    ]
                },
                {
                    question: "After gathering details, you should:",
                    options: [
                        { text: "Coordinate with other guides to check assigned cars", correct: true },
                        { text: "Make general announcement", correct: false },
                        { text: "Tell child to stop crying", correct: false },
                        { text: "Suggest buying new toy", correct: false }
                    ]
                },
                {
                    question: "While search is ongoing, next step is:",
                    options: [
                        { text: "Abandon search after one try", correct: false },
                        { text: "Distract child with snacks", correct: false },
                        { text: "Keep family updated and maintain positive attitude", correct: true },
                        { text: "Tell story about lost toys", correct: false }
                    ]
                },
                {
                    question: "If toy isn't found immediately, you should:",
                    options: [
                        { text: "Give up searching", correct: false },
                        { text: "Document details for lost and found report", correct: true },
                        { text: "Tell child to forget about it", correct: false },
                        { text: "Blame other passengers", correct: false }
                    ]
                },
                {
                    question: "Final step in lost toy situation:",
                    options: [
                        { text: "Forget about the incident", correct: false },
                        { text: "Provide contact information for follow-up", correct: true },
                        { text: "Tell them to buy a new toy", correct: false },
                        { text: "Suggest child be more careful", correct: false }
                    ]
                }
            ]
        }
    ],
schedule_confusion: [
        {
            title: "Multiple passengers confused about dinner seating times and reservations.",
            text: "Dining Coordination: Passengers unsure about dinner schedule and reservation system.",
            steps: [
                {
                    question: "As the Alaska Railroad train glides through the stunning landscape of the Last Frontier, the golden afternoon sun casts long shadows across the dining car. The aroma of freshly prepared pot roast wafts through the air, mingling with the excitement of passengers anticipating their evening dining experience. However, a growing murmur of confusion begins to ripple through the cars as travelers from both GoldStar and Adventure Class services congregate near the dining areas, their faces a mix of hunger and uncertainty:",
                    options: [
                        { text: "Tell them to figure it out later", correct: false },
                        { text: "Check current dining schedule and availability with the Dining Captain", correct: true },
                        { text: "Suggest skipping dinner", correct: false },
                        { text: "Send everyone to dining car now", correct: false }
                    ]
                },
                {
                    question: "After checking with the Dining Captain, you should:",
                    options: [
                        { text: "Make reservations without confirming", correct: false },
                        { text: "Tell them to eat snacks instead", correct: false },
                        { text: "Clearly explain timing and reservation process", correct: true },
                        { text: "Leave notes for dining staff", correct: false }
                    ]
                },
                {
                    question: "While managing reservations, next step is:",
                    options: [
                        { text: "Coordinate with Dining Captain to confirm details", correct: true },
                        { text: "Promise everyone preferred times", correct: false },
                        { text: "Tell them to be flexible", correct: false },
                        { text: "Start dinner service early", correct: false }
                    ]
                },
               {
                    question: "Final step in managing dinner service:",
                    options: [
                        { text: "Leave dining staff to manage alone", correct: false },
                        { text: "Document all reservations and special requests to share with Dining Captain", correct: true },
                        { text: "Tell passengers to hurry", correct: false },
                        { text: "Close dining car early", correct: false }
                    ]
                }
            ]
        }
    ],
photo_requests: [
        {
            title: "Multiple groups requesting photos during scenic viewpoints, backing up passenger flow.",
            text: "Photo Management: Heavy photo requests creating congestion in viewing areas.",
            steps: [
                {
                    question: "The narrow aisle of the train car quickly becomes congested as multiple groups of friends and families jostle for position, each determined to get the perfect shot with the stunning Alaskan landscape as their backdrop. Passengers lean across each other, pressing against windows on both sides of the train, while others form impromptu queues, waiting for their turn at the prime viewing spots:",
                    options: [
                        { text: "Refuse all photo requests",correct: false },
                        { text: "Organize systematic photo opportunities",correct: true },
                        { text: "Tell them to take selfies", correct: false },
                        { text: "Ignore the congestion", correct: false }
                    ]
                },
                {
                    question: "After organizing photo system, you should:",
                    options: [
                        { text: "Rush each group quickly", correct: false },
                        { text: "Create efficient photo lines while narrating", correct: true },
                        { text: "Stop allowing photos", correct: false },
                        { text: "Charge for photo service", correct: false }
                    ]
                },
                {
                    question: "While managing photos, next step is:",
                    options: [
                        { text: "Share best photo spots coming up", correct: true },
                        { text: "Take only group photos", correct: false },
                        { text: "Start a photo contest", correct: false },
                        { text: "Tell them to wait for better views", correct: false }
                    ]
                }
            ]
        }
    ],
tech_failure: [
        {
            title: "Your microphone system has failed during peak scenic narration.",
            text: "Equipment Issue: PA system not working during important commentary section.",
            steps: [
                {
                    question: "As the train winds through a breathtaking stretch of Alaskan wilderness, with glaciers glistening in the distance and wildlife roaming the nearby meadows, the tour guide's voice suddenly cuts out mid-sentence, leaving passengers straining to hear crucial commentary about the passing landmarks and the rich history of the region:",
                    options: [
                        { text: "Skip the narration entirely", correct: false },
                        { text: "Switch to the wired mic on trainline, ask another team member on the Radio to verify that it is coming through", correct: true },
                        { text: "Yell the narration", correct: false },
                        { text: "Tell passengers to read their guides", correct: false }
                    ]
                },
                {
                    question: "If wired mic is also not working, you should:",
                    options: [
                        { text: "Give up on narration", correct: false },
                        { text: "Tell passengers to look it up", correct: false },
                        { text: "Move through cars providing closer-range narration", correct: true },
                        { text: "Write notes for passengers", correct: false }
                    ]
                },
 {
                    question: "While managing without PA, next step is:",
                    options: [
                        { text: "Wait for next stop to fix it", correct: false },
                        { text: "Coordinate with other guides for coverage", correct: true },
                        { text: "Skip remaining commentary", correct: false },
                        { text: "Play music instead", correct: false }
                    ]
                },
 {
                    question: "If the problem persists:",
                    options: [
                        { text: "Give up on narration", correct: false },
                        { text: "Tell passengers to look it up", correct: false },
                        { text: "Move through cars checking to see if train line connection works from any of the cars", correct: true },
                        { text: "Write notes for passengers", correct: false }
                    ]
                },
                {
                    question: "If train line is interupted completely:",
                    options: [
                        { text: "Wait for next stop to fix it", correct: false },
                        { text: "Coordinate the conductor for their 238 report", correct: true },
                        { text: "Skip remaining commentary", correct: false },
                        { text: "Play music instead", correct: false }
                    ]
                }
            ]
        }
    ],
medical_emergency: [
        {
            title: "A passenger has collapsed and appears unresponsive.",
            text: "Medical Emergency: Immediate response needed for an unresponsive passenger.",
            steps: [
                {
                    question: "The tranquil journey through Alaska's rugged landscape is suddenly shattered as a passenger collapses in the aisle of Car B, their body lying motionless amidst the gasps and cries of shocked onlookers, while the train continues its relentless progress through the remote wilderness, miles away from the nearest hospital:",
                    options: [
                        { text: "Start performing CPR immediately", correct: false },
                        { text: "Assess situation and call conductor while ensuring safety", correct: true },
                        { text: "Ask other passengers for medical expertise",  correct: false },
                        { text: "Move the passenger to a different car", correct: false }
                    ]
                },
                {
                    question: "After initial assessment, you should:",
                    options: [
                        { text: "Take photos for documentation", correct: false },
                        { text: "Use first aid training to check vitals and assist", correct: true },
                        { text: "Ask passenger what happened", correct: false },
                        { text: "Wait for emergency services", correct: false }
                    ]
                },
                {
                    question: "While waiting for medical help, next step is:",
                    options: [
                        { text: "Leave passenger to check on others", correct: false },
                        { text: "Share medical stories with passengers", correct: false },
                        { text: "Manage crowd and maintain calm environment", correct: true },
                        { text: "Call passenger's family", correct: false }
                    ]
                }
            ]
        }
    ],
    restroom_malfunction: [
        {
            title: "A restroom is out of service with plumbing and odor issues.",
            text: "Facility Problem: Restroom malfunction affecting passenger comfort.",
            steps: [
                {
                    question: "As the Alaska Railroad train winds through the pristine wilderness, an unmistakable and unpleasant odor begins to waft through Car C, drawing wrinkled noses and concerned glances from passengers. The source becomes apparent as a hastily scrawled 'Out of Order' sign appears on one of the restroom doors, while a growing line of increasingly anxious travelers forms at the remaining functional facilities, testing both patience and bladder control as the journey continues through the remote Alaskan terrain:",
                    options: [
                        { text: "Ignore the problem", correct: false },
                        { text: "Tell passengers to hold it", correct: false },
                        { text: "Secure restroom and assess situation", correct: true },
                        { text: "Ask passengers to fix it", correct: false }
                    ]
                },
                {
                    question: "After securing the area, you should:",
                    options: [
                        { text: "Wait until next stop", correct: false },
                        { text: "Alert crew and attempt basic troubleshooting", correct: true },
                        { text: "Blame previous passengers", correct: false },
                        { text: "Close all restrooms", correct: false }
                    ]
                },
                {
                    question: "If issue persists, next step is:",
                    options: [
                        { text: "Ignore passenger complaints", correct: false },
                        { text: "Contact maintenance and report to manager", correct: true },
                        { text: "Reopen restroom anyway", correct: false },
                        { text: "Tell passengers to use station restrooms", correct: false }
                    ]
                }
            ]
        }
    ],
    safety_breach: [
        {
            title: "A passenger is standing on the train's exterior platform unsafely.",
            text: "Safety Violation: Passenger ignoring safety protocols in dangerous manner.",
            steps: [
                {
                    question: "As the Alaska Railroad train snakes through a particularly scenic stretch of wilderness, gasps of alarm ripple through the observation car as passengers spot a fellow traveler precariously balanced on the narrow exterior platform, arms outstretched for the perfect selfie, seemingly oblivious to the rushing wind and the potential for disaster as the train rounds each bend at speed:",
                    options: [
                        { text: "Yell at the passenger", correct: false },
                        { text: "Ignore the violation", correct: false },
                        { text: "Calmly but firmly address safety risk", correct: true },
                        { text: "Call police immediately", correct: false }
                    ]
                },
                {
                    question: "After initial warning, you should:",
                    options: [
                        { text: "Threaten to stop the train", correct: false },
                        { text: "Clear enforcement of rules and report to conductor", correct: true },
                        { text: "Record the passenger", correct: false },
                        { text: "Ask other passengers to help", correct: false }
                    ]
                },
                {
                    question: "For ongoing monitoring, next step is:",
                    options: [
                        { text: "Avoid the passenger", correct: false },
                        { text: "Monitor behavior and prepare for escalation", correct: true },
                        { text: "Remove passenger at next stop", correct: false },
                        { text: "Issue written warning", correct: false }
                    ]
                }
            ]
        }
    ],
catering_delay: [
        {
            title: "Special event train is delayed with catering service breakdown.",
            text: "Service Delay: Communication breakdown causing catering delays for special event.",
            steps: [
                {
                    question: "As the specially chartered Alaska Railroad train sits motionless on the tracks, the festive atmosphere of the eagerly anticipated corporate event onboard begins to sour. Inside the elegantly decorated dining cars, empty plates and growling stomachs replace the expected gourmet feast, while harried staff members whisper urgently into phones and radios, trying to locate the missing catering trucks that were supposed to meet the train at its last scheduled stop:",
                    options: [
                        { text: "Cancel the catering service", correct: false },
                        { text: "Blame the catering company", correct: false },
                        { text: "Assess situation and inform event coordinator", correct: true },
                        { text: "Tell passengers to find their own food", correct: false }
                    ]
                },
                {
                    question: "After assessment, you should:",
                    options: [
                        { text: "Ignore passenger concerns", correct: false },
                        { text: "Coordinate with crew and catering for solution", correct: true },
                        { text: "Offer refunds immediately", correct: false },
                        { text: "End the special event", correct: false }
                    ]
                },
                {
                    question: "While resolving issue, next step is:",
                    options: [
                        { text: "Hide from passengers", correct: false },
                        { text: "Provide consistent updates to passengers", correct: true },
                        { text: "Make promises about timing", correct: false },
                        { text: "Start a different activity", correct: false }
                    ]
                }
            ]
        }
    ],
    valuable_lost_item: [
        {
            title: "A passenger reports losing a valuable item somewhere on the train.",
            text: "Lost Valuable: High-value item reported missing during journey.",
            steps: [
                {
                    question: "Amidst the gentle rocking of the Alaska Railroad train and the breathtaking panorama of snow-capped mountains outside, a sudden commotion erupts in Car D as a distraught passenger frantically searches their belongings, their face etched with panic upon realizing that a family heirloom diamond necklace—a cherished gift meant for their daughter's upcoming wedding in Anchorage—has vanished somewhere between Fairbanks and their current location in the heart of the Alaskan wilderness:",
                    options: [
                        { text: "Tell them it's probably stolen", correct: false },
                        { text: "Document details and show empathy", correct: true },
                        { text: "Ignore the report", correct: false },
                        { text: "Blame other passengers", correct: false }
                    ]
                },
                {
                    question: "After documentation, you should:",
                    options: [
                        { text: "Tell passenger to search alone", correct: false },
                        { text: "Conduct thorough search and alert staff", correct: true },
                        { text: "Suggest insurance claim", correct: false },
                        { text: "Wait until end of journey", correct: false }
                    ]
                },
                {
                    question: "For proper follow-up, next step is:",
                    options: [
                        { text: "Forget about the item", correct: false },
                        { text: "Promise to find it", correct: false },
                        { text: "File detailed report and provide contact info", correct: true },
                        { text: "Tell them to check lost and found later", correct: false }
                    ]
                }
            ]
        }
    ],
facility_maintenance: [
    {
        title: "Child's Cereal Creates Unexpected Spill During Service",
        text: "Service Challenge: Child's cereal spilled during critical on-board service moment requires immediate attention.",
        steps: [
            {
                question: "As the Alaska Railroad dining car bustles with the morning breakfast service, a moment of chaos erupts when a young child's enthusiastic attempt to pour their own cereal goes awry. A cascade of colorful, sugary loops arcs through the air, scattering across the aisle and neighboring tables, creating a crunchy carpet that threatens to disrupt the entire meal service. Nearby passengers react with a mix of amusement and annoyance:",
                options: [
                    { text: "Ignore the spill completely", correct: false },
                    { text: "Quickly assess spill area and potential safety hazards", correct: true },
                    { text: "Tell the child to clean it up", correct: false },
                    { text: "Scold the parents for not controlling their child", correct: false }
                ]
            },
            {
                question: "After initial assessment, you should:",
                options: [
                    { text: "Use passenger's clothing to wipe up spill", correct: false },
                    { text: "Retrieve appropriate cleaning supplies while maintaining passenger service", correct: true },
                    { text: "Ask other passengers for help", correct: false },
                    { text: "Leave the spill for later", correct: false }
                ]
            },
            {
                question: "While cleaning the spill, you need to:",
                options: [
                    { text: "Stop all other duties completely", correct: false },
                    { text: "Multitask and continue primary service responsibilities", correct: true },
                    { text: "Make the child feel embarrassed", correct: false },
                    { text: "Ask the conductor to handle it", correct: false }
                ]
            },
            {
                question: "After initial cleanup, your next step is:",
                options: [
                    { text: "Pretend nothing happened", correct: false },
                    { text: "Ensure area is fully sanitized and safe for other passengers", correct: true },
                    { text: "Tell parents to be more careful", correct: false },
                    { text: "Mark area as temporarily off-limits", correct: false }
                ]
            },
            {
                question: "Final action for the cereal spill incident:",
                options: [
                    { text: "Forget to document the incident", correct: false },
                    { text: "Make brief note in service log about cleaning and maintaining passenger flow", correct: true },
                    { text: "Blame the cleaning staff", correct: false },
                    { text: "Tell other staff about the messy child", correct: false }
                ]
            }
        ]
    }
],

dining_service: [
        {
            title: "The Indecisive Diner",
            text: "A guest is unsure what to order and asks for recommendations.",
            steps: [
                {
                    question: "As the Alaska Railroad dining car hums with the quiet chatter of passengers enjoying their meals against a backdrop of stunning wilderness views, a flustered traveler at Table 7 repeatedly flips through the menu, sighing in exasperation. The patient server hovers nearby, pen poised over order pad, while a growing line of hungry passengers forms at the dining car entrance. The indecisive diner's companions shift uncomfortably in their seats, their eyes darting between their undecided tablemate and the tempting dishes being served to neighboring tables, as the train winds its way through a particularly picturesque valley that demands attention. The guest hesitates: 'I’m not sure what to get. What do you recommend?'",
                    options: [
                        { text: "Shrug and tell them to pick anything", correct: false },
                        { text: "List your personal favorites only", correct: false },
                        { text: "Ask about their preferences and offer well-reviewed choices", correct: true },
                        { text: "Tell them everything is amazing and walk away", correct: false }
                    ]
                },
                {
                    question: "Guest asks about dietary preferences. What do you do?",
                    options: [
                        { text: "Say you don’t know and move on", correct: false },
                        { text: "Provide menu details including vegetarian and gluten-free options", correct: true },
                        { text: "Tell them to just order something without reading the menu", correct: false },
                        { text: "Suggest the steak to a vegetarian", correct: false }
                    ]
                }
            ]
        }
],
dining_service_hangry: [
        {
            title: "The Hangry Customer",
            text: "A guest is frustrated about a long wait for food.",
            steps: [
                {
                    question: "As the Alaska Railroad train winds through a majestic mountain pass, the dining car becomes a pressure cooker of tension. A red-faced passenger at Table 3, his hunger exacerbated by the tantalizing aromas wafting from nearby tables, drums his fingers impatiently on the white tablecloth. His eyes dart between his watch and the kitchen entrance, narrowing with each passing minute. The server, noticing the guest's increasingly agitated state, approaches with trepidation, aware that the kitchen is struggling to keep up with the unexpected influx of orders triggered by a particularly stunning vista that sent everyone to the dining car at once. Other diners cast nervous glances as the man's voice rises, his complaints about the wait time cutting through the usual pleasant chatter and clinking of cutlery. The serene Alaskan wilderness outside stands in stark contrast to the brewing storm of frustration within the confined space of the dining car The guest complains: 'We’ve been waiting 30 minutes. What’s going on?'",
                    options: [
                        { text: "Ignore them and walk away", correct: false },
                        { text: "Apologize and explain the delay", correct: true },
                        { text: "Tell them to be patient like everyone else", correct: false },
                        { text: "Blame the kitchen loudly", correct: false }
                    ]
                },
                {
                    question: "Guest remains upset. What’s your next move?",
                    options: [
                        { text: "Offer a complimentary drink or snack", correct: true },
                        { text: "Ask them why they’re being so impatient", correct: false },
                        { text: "Tell them they can leave if they don’t like it", correct: false },
                        { text: "Avoid eye contact and hide in the kitchen", correct: false }
                    ]
                }
            ]
        }
    ],
dining_service_service: [
        {
            title: "The 'Not Worth the Price' Complaint",
            text: "A guest feels the experience isn’t worth the cost.",
            steps: [
                {
                    question: "As the Alaska Railroad train glides past breathtaking glaciers and pristine forests, a disgruntled passenger loudly proclaims that the journey is 'highway robbery', gesturing at their half-eaten meal and the admittedly stunning view outside, while nearby travelers shift uncomfortably, their own enjoyment of the unique rail experience momentarily overshadowed by the vocal dissatisfaction. The guest comments: 'For this price, I expected better.' How do you respond?",
                    options: [
                        { text: "Tell them prices are set and they should have researched better", correct: false },
                        { text: "Listen actively and ask what they were expecting", correct: true },
                        { text: "Roll your eyes and walk away", correct: false },
                        { text: "Tell them they got what they paid for", correct: false }
                    ]
                },
                {
                    question: "Guest elaborates: 'Food portions were small, and service was slow.' What’s next?",
                    options: [
                        { text: "Apologize and mention efforts to improve", correct: true },
                        { text: "Tell them portion sizes are standard, deal with it", correct: false },
                        { text: "Suggest they eat before boarding next time", correct: false },
                        { text: "Offer them a free ride next time without authorization", correct: false }
                    ]
                }
            ]
        }
    ],
dining_service_mechanical: [
        {
            title: "Unexpected Restroom Lock Failure",
            text: "A guest is trapped inside a malfunctioning restroom.",
            steps: [
                {
                    question: "Panic rises in the narrow confines of the train's restroom as a distressed passenger realizes the door won't budge, their increasingly frantic calls for help barely audible over the rhythmic clatter of wheels on tracks and the oblivious chatter of fellow travelers in the adjacent car. You hear a guest yelling from inside the restroom. What do you do first?",
                    options: [
                        { text: "Ignore it, they’ll figure it out", correct: false },
                        { text: "Calmly reassure them while assessing the situation", correct: true },
                        { text: "Panic and try to force the door open immediately", correct: false },
                        { text: "Make a joke about their bad timing", correct: false }
                    ]
                },
                {
                    question: "You determine the lock is jammed. Next step?",
                    options: [
                        { text: "Call the conductor or maintenance team", correct: true },
                        { text: "Tell the guest to start kicking the door", correct: false },
                        { text: "Advise them to climb through the ceiling", correct: false },
                        { text: "Slide snacks under the door while waiting", correct: false }
                    ]
                }
            ]
        }
    ],
 facility_maintenance_02: [
        {
            title: "The Mysterious Restroom Odor",
            text: "A guest reports a bad smell coming from the restroom, but it appears clean.",
            steps: [
                {
                    question: "As passengers wrinkle their noses and hurriedly pass by, an inexplicable and pungent odor wafts from the seemingly spotless train restroom, baffling staff and creating a malodorous mystery that threatens to overpower the fresh Alaska air filtering through the train's ventilation system. A guest complains: 'The restroom smells awful!' What do you do?",
                    options: [
                        { text: "Ignore it—smells happen", correct: false },
                        { text: "Check the restroom and investigate the source", correct: true },
                        { text: "Hand them an air freshener and walk away", correct: false },
                        { text: "Make a PA announcement asking who did it", correct: false }
                    ]
                },
                {
                    question: "The restroom is visibly clean, but the smell persists. What’s next?",
                    options: [
                        { text: "Spray some air freshener and move on", correct: false },
                        { text: "Report the issue in your TRIP REPORT for further cleaning", correct: true },
                        { text: "Blame it on the previous passengers", correct: false },
                        { text: "Lock the restroom and put an 'Out of Order' sign", correct: false }
                    ]
                },
                {
                    question: "A second guest complains about the same issue. How do you respond?",
                    options: [
                        { text: "Tell them you're aware and working on it", correct: true },
                        { text: "Say 'it's a train, what do you expect?'", correct: false },
                        { text: "Offer them a refund on their ticket", correct: false },
                        { text: "Tell them to hold their breath", correct: false }
                    ]
                }
            ]
        }
    ],
    schedule_confusion_02: [
        {
            title: "The Unscheduled Delay",
            text: "A delay occurs due to unexpected track congestion, and passengers are getting impatient.",
            steps: [
                {
                    question: "As the Alaska Railroad train grinds to an unexpected halt amidst the wilderness, anxious murmurs ripple through the cars while passengers crane their necks to glimpse the cause of the delay, their meticulously planned itineraries and connecting transportation arrangements now hanging in the balance. What’s your first step?",
                    options: [
                        { text: "Wait for passengers to start asking questions", correct: false },
                        { text: "Make a PA announcement acknowledging the delay", correct: true },
                        { text: "Tell passengers to look outside and figure it out", correct: false },
                        { text: "Panic and jump off the train", correct: false }
                    ]
                },
                {
                    question: "A guest angrily asks how long the delay will last, but you don’t know. How do you respond?",
                    options: [
                        { text: "Guess a random timeframe", correct: false },
                        { text: "Explain that you are waiting for an update from Dispatch, connect with the conductor", correct: true },
                        { text: "Tell them delays are part of the adventure", correct: false },
                        { text: "Say ‘forever’ and walk away", correct: false }
                    ]
                },
                {
                    question: "The delay extends beyond 30 minutes. What should you do?",
                    options: [
                        { text: "Stay silent to avoid more complaints", correct: false },
                        { text: "Make regular announcements updating passengers", correct: true },
                        { text: "Tell them to ask the conductor instead", correct: false },
                        { text: "Blame it on bad luck", correct: false }
                    ]
                },
                {
                    question: "Passengers are getting restless. How can you help maintain a positive experience?",
                    options: [
                        { text: "Offer drink service or suggest ways to pass the time", correct: true },
                        { text: "Tell them to stop complaining", correct: false },
                        { text: "Start a conspiracy theory about train sabotage", correct: false },
                        { text: "Say ‘this is why people fly’", correct: false }
                    ]
                }
            ]
        }
    ],
    dino: [
{
title: "Hungry dinosaurs are loose on your Alaska Railroad passenger train!",
text: "Jurassic Emergency: Hungry dinosaurs have escaped their transport containers and are now loose on your Alaska Railroad passenger train!",
steps: [
{
question: "As the Alaska Railroad train winds through the pristine wilderness, an unthinkable scenario unfolds. Passengers' screams of terror pierce the air as hungry dinosaurs, inexplicably present on a 21st-century train, break free from their mysterious containment. The peaceful journey transforms into a heart-pounding race for survival, with the majestic Alaskan landscape serving as a surreal backdrop to this impossible Jurassic nightmare. Panicked travelers scramble for safety in the narrow confines of the train cars, while the prehistoric predators lumber down the aisles, their ancient instincts awakened by the scent of fear and the promise of an easy meal. Train staff, utterly unprepared for this fantastical emergency, frantically attempt to coordinate an evacuation plan as the train hurtles through remote terrain, miles from the nearest help:",
options: [
{ text: "Pretend it's just a marketing stunt", correct: false },
{ text: "Tell passengers to use their suitcases as shields", correct: false },
{ text: "Make urgent PA announcement explaining situation and safety instructions", correct: true },
{ text: "Try to lure dinosaurs off the train with snacks", correct: false }
]
},
{
question: "You've made an urgent PA announcement. What's your next step?",
options: [
{ text: "Start a dinosaur-naming contest", correct: false },
{ text: "Attempt to train the dinosaurs for a circus act", correct: false },
{ text: "Tell passengers to sacrifice their luggage to the dinosaurs", correct: false },
{ text: "Coordinate with conductor to contact Dispatch and activate emergency protocols", correct: true }
]
},
{
question: "After coordinating with the conductor and activating protocols, you should:",
options: [
{ text: "Wait for the dinosaurs to get bored and leave", correct: false },
{ text: "Secure passengers in safe areas, monitor dinosaur locations, provide regular updates", correct: true },
{ text: "Organize a dinosaur-spotting competition", correct: false },
{ text: "Ask passengers if anyone has experience in paleontology", correct: false }
]
},
{
question: "While maintaining passenger safety and providing updates, what's next?",
options: [
{ text: "Start writing your memoir about the incident", correct: false },
{ text: "Become an impromptu tour guide for 'Dinosaurs of Alaska'", correct: false },
{ text: "Coordinate with emergency services and dinosaur handlers for safe containment", correct: true },
{ text: "Tell passengers to update their social media status", correct: false }
]
},
{
question: "After the dinosaurs are contained and the situation is under control, you need to:",
options: [
{ text: "Sell 'I Survived the Dino Train' t-shirts", correct: false },
{ text: "Propose a new 'Jurassic Alaska' theme park", correct: false },
{ text: "Tell passengers to file their own incident reports", correct: false },
{ text: "Implement passenger care protocols, including medical checks and service recovery measures", correct: true }
]
}
],
}
],
emergency_scenarios: [
{
title: "Multiple emergencies on your Alaska Railroad passenger train",
text: "Crisis Management: You're facing multiple urgent situations simultaneously on your Alaska Railroad passenger train.",
steps: [
{
question: "As the Alaska Railroad train winds through the rugged Alaskan wilderness, chaos erupts in multiple cars simultaneously. A child's piercing scream of pain cuts through the air, while an agitated passenger loudly demands attention from the overwhelmed staff. In the background, frustrated murmurs grow as travelers discover the restroom's lack of paper towels. Amidst this cacophony, an urgent announcement needs to be made, leaving the train crew facing a critical decision on how to prioritize these overlapping crises as the train continues its relentless journey through the remote landscape. What do you do first?",
options: [
{ text: "Restock the paper towels in the restroom", correct: false },
{ text: "Make the important announcement", correct: false },
{ text: "Check on the screaming child", correct: true },
{ text: "Attend to the demanding passenger", correct: false }
]
},
{
question: "After checking on the screaming child, what's your next step?",
options: [
{ text: "Now restock the paper towels", correct: false },
{ text: "Make the important announcement to all passengers", correct: true },
{ text: "Deal with the demanding passenger", correct: false },
{ text: "Take a quick break to collect yourself", correct: false }
]
},
{
question: "With the important announcement handled, you should now:",
options: [
{ text: "Finally restock those paper towels", correct: false },
{ text: "Take that much-needed break", correct: false },
{ text: "Politely address the demanding passenger's concerns", correct: true },
{ text: "Start writing up incident reports", correct: false }
]
},
{
question: "After addressing the passenger's concerns, what's your next priority?",
options: [
{ text: "Restock the restroom supplies", correct: true },
{ text: "Inform your supervisor about the incidents", correct: false },
{ text: "Check social media for passenger complaints", correct: false },
{ text: "Plan how to prevent future incidents", correct: false }
]
},
{
question: "With immediate concerns addressed and restocking the restroom supplies, your final step should be:",
options: [
{ text: "Relax and hope nothing else goes wrong", correct: false },
{ text: "Avoid the areas where problems occurred", correct: false },
{ text: "Tell passengers to be more self-sufficient", correct: false },
{ text: "Follow up with affected passengers and report incidents to supervisor", correct: true }
]
}
],
}
],
language_barrier: [
    {
        title: "International tourists struggling with safety instructions",
        text: "Communication Challenge: A group of international tourists is having difficulty understanding important safety information.",
        steps: [
            {
                question: "As the Alaska Railroad train departs Anchorage, a group of international tourists chatters excitedly in an unfamiliar language, their faces beaming with anticipation. However, as the Tour Guide begins the pre-journey safety briefing, their expressions quickly shift from joy to confusion, highlighting a critical language barrier that threatens to compromise their understanding of essential safety information. How do you identify the language barrier issue?",
                options: [
                    { text: "Assume they don't speak English", correct: false },
                    { text: "Observe comprehension cues and respectfully confirm understanding", correct: true },
                    { text: "Ask them to speak English", correct: false },
                    { text: "Skip safety instructions", correct: false }
                ]
            },
            {
                question: "What non-verbal communication approach should you use?",
                options: [
                    { text: "Use aggressive hand gestures", correct: false },
                    { text: "Speak louder in English", correct: false },
                    { text: "Use clear gestures, demonstrations, and universal safety symbols", correct: true },
                    { text: "Give up on communication", correct: false }
                ]
            },
            {
                question: "How do you handle translation needs?",
                options: [
                    { text: "Ignore translation needs", correct: false },
                    { text: "Use only computer translation", correct: false },
                    { text: "Identify bilingual passengers or staff who can assist", correct: true },
                    { text: "Make passengers find their own translator", correct: false }
                ]
            },
            {
                question: "What visual aids should you utilize?",
                options: [
                    { text: "Only use verbal instructions", correct: false },
                    { text: "Show safety cards, emergency diagrams, and universal symbols", correct: true },
                    { text: "Draw pictures on paper", correct: false },
                    { text: "Skip visual demonstrations", correct: false }
                ]
            },
            {
                question: "How do you ensure ongoing safety compliance?",
                options: [
                    { text: "Assume they understood everything", correct: false },
                    { text: "Monitor understanding and provide additional visual guidance as needed", correct: true },
                    { text: "Separate them from other passengers", correct: false },
                    { text: "Have them sign a waiver", correct: false }
                ]
            }
        ]
    }
],

disruptive_passenger: [
    {
        title: "Loud and argumentative passenger disturbing others",
        text: "Service Challenge: A passenger is being disruptive and causing disturbance to other guests.",
        steps: [
            {
                question: "As the Alaska Railroad train winds through a serene valley, the peaceful atmosphere is shattered by a passenger's booming voice and aggressive gestures, their heated argument on a phone call drawing irritated glances from fellow travelers. The disruptive guest seems oblivious to the growing tension in the car, continuing their loud tirade despite the conductor's polite requests for quieter behavior. How should you initially approach the situation?",
                options: [
                    { text: "Immediately call security", correct: false },
                    { text: "Ignore the disruption", correct: false },
                    { text: "Calmly approach and assess the situation professionally", correct: true },
                    { text: "Tell passenger to be quiet", correct: false }
                ]
            },
            {
                question: "What de-escalation technique should you use?",
                options: [
                    { text: "Threaten with consequences", correct: false },
                    { text: "Argue back with passenger", correct: false },
                    { text: "Listen actively and acknowledge concerns while setting clear boundaries", correct: true },
                    { text: "Ignore the passenger completely", correct: false }
                ]
            },
            {
                question: "When should additional help be involved?",
                options: [
                    { text: "Never involve others", correct: false },
                    { text: "Only after physical threats", correct: false },
                    { text: "When initial de-escalation attempts aren't successful", correct: true },
                    { text: "Immediately call police", correct: false }
                ]
            },
            {
                question: "How do you handle other affected passengers?",
                options: [
                    { text: "Tell them to handle it themselves", correct: false },
                    { text: "Ignore their concerns", correct: false },
                    { text: "Apologize and address their concerns while maintaining privacy", correct: true },
                    { text: "Move everyone to different cars", correct: false }
                ]
            },
            {
                question: "What preventive measures should you take?",
                options: [
                    { text: "Ban the passenger from future trips", correct: false },
                    { text: "Document incident and review procedures for improvement", correct: true },
                    { text: "Ignore the incident completely", correct: false },
                    { text: "Blame other passengers", correct: false }
                ]
            }
        ]
    }
],

luggage_missing: [
    {
        title: "Passenger's luggage missing after boarding",
        text: "Service Recovery: A passenger has reported their luggage is missing after boarding the train.",
        steps: [
            {
                question: "As the Alaska Railroad train pulls away from the station, a panicked passenger frantically searches the luggage racks, their face etched with distress as they realize their suitcase is nowhere to be found. The traveler approaches a crew member with growing anxiety, gesturing wildly towards the receding platform where their belongings may have been left behind. How do you handle the initial report?",
                options: [
                    { text: "Tell them to wait until next stop", correct: false },
                    { text: "Gather detailed information about the luggage and last known location, look for a luggage tag receipt", correct: true },
                    { text: "Suggest they lost it themselves", correct: false },
                    { text: "Ignore the complaint", correct: false }
                ]
            },
            {
                question: "What steps do you take to locate the luggage, they have a luggage tag receipt but are still concerned about their bag?",
                options: [
                    { text: "Wait for someone to find it", correct: false },
                    { text: "Tell passenger to search themselves", correct: false },
                    { text: "Coordinate searching the bag car crates for the missing bag", correct: true },
                    { text: "Suggest filing insurance claim", correct: false }
                ]
            },
            {
                question: "How do you maintain communication?",
                options: [
                    { text: "Wait for passenger to ask", correct: false },
                    { text: "Provide regular updates and next steps", correct: true },
                    { text: "Tell them to check later", correct: false },
                    { text: "Avoid the passenger", correct: false }
                ]
            },
            {
                question: "How do you handle follow-up?",
                options: [
                    { text: "Consider the case closed", correct: false },
                    { text: "Provide contact information and file detailed report", correct: true },
                    { text: "Tell them to contact lost and found", correct: false },
                    { text: "Forget about the incident", correct: false }
                ]
            }
        ]
    }
],
serviceQuality: [
    {
        title: "Handling Service Quality Complaints",
        text: "Manage recurring service issues by gathering precise feedback, recognizing exceptional staff, and enforcing proactive customer interaction.",
        steps: [
            {
                question: "As the Alaska Railroad's OnBoardf Services team gathers for their weekly meeting, a growing stack of complaint forms and a flurry of negative online reviews demand immediate attention. The team leader, aware of the potential impact on the railroad's reputation, calls for a comprehensive strategy to address these recurring service issues and transform passenger experiences from disappointment to delight: How do you begin addressing service quality concerns?",
                options: [
                    { text: "Assume it's an isolated incident", correct: false },
                    { text: "Ignore complaints and hope they resolve themselves", correct: false },
                    { text: "Collect detailed feedback on specific staff interactions", correct: true },
                    { text: "Issue a blanket apology without investigation", correct: false }
                ]
            },
            {
                question: "Review of Positive Feedback: What's the next logical step?",
                options: [
                    { text: "Dismiss compliments as flukes", correct: false },
                    { text: "Identify and highlight exemplary staff performance", correct: true },
                    { text: "Focus only on negative comments", correct: false },
                    { text: "Reward everyone indiscriminately", correct: false }
                ]
            },
            {
                question: "Staff Training: How should you address recurring poor service behavior?",
                options: [
                    { text: "Ignore training needs", correct: false },
                    { text: "Conduct targeted training on proactive communication and empathy", correct: true },
                    { text: "Schedule one-off meetings without follow-up", correct: false },
                    { text: "Implement immediate punitive measures", correct: false }
                ]
            },
            {
                question: "Communication Protocols: What should be implemented next?",
                options: [
                    { text: "Leave communication standards vague", correct: false },
                    { text: "Develop clear guidelines for staff-patron interactions", correct: true },
                    { text: "Delegate communication to junior staff", correct: false },
                    { text: "Rely on sporadic instructions", correct: false }
                ]
            },
            {
                question: "Monitoring & Follow-Up: How do you ensure long-term improvement?",
                options: [
                    { text: "Stop gathering feedback once training is done", correct: false },
                    { text: "Conduct regular reviews and passenger surveys", correct: true },
                    { text: "Assume issues will not recur", correct: false },
                    { text: "Monitor only when complaints escalate", correct: false }
                ]
            }
        ]
    }
],

punctualityDelays: [
    {
        title: "Managing Train Punctuality and Delay Communication",
        text: "Address delay issues through immediate verification, clear public announcements, effective crew coordination, and post-delay reviews.",
        steps: [
            {
                question: "As the Alaska Railroad's Denali Star train winds through the wilderness, an OnBoard Services Specialist notices an unexpected delay alert on their communication device. Recognizing the potential impact on passenger satisfaction and operational efficiency, the Specialist swiftly moves to coordinate with the train's conductor, setting in motion a well-rehearsed response plan to address the situation: What's your first move upon identifying a delay?",
                options: [
                    { text: "Issue a vague, minimal announcement", correct: false },
                    { text: "Make a detailed PA announcement with updated ETA", correct: true },
                    { text: "Suggest passengers look outside and figure it out", correct: false },
                    { text: "Remain silent and let rumors spread", correct: false }
                ]
            },
            {
                question: "Crew Coordination: What action follows the announcement?",
                options: [
                    { text: "Let the crew handle issues independently", correct: false },
                    { text: "Coordinate with the conductor and Dispatch on crew shifts", correct: true },
                    { text: "Delay communication until later", correct: false },
                    { text: "Ignore crew scheduling problems", correct: false }
                ]
            },
            {
                question: "Passenger Support: How do you manage passengers affected by the delay?",
                options: [
                    { text: "Offer no compensation or explanation", correct: false },
                    { text: "Implement service recovery protocols and provide regular updates", correct: true },
                    { text: "Start humorous diversions to distract them", correct: false },
                    { text: "Encourage passengers to handle their own travel changes", correct: false }
                ]
            },
            {
                question: "Post-Delay Analysis: What's the final step?",
                options: [
                    { text: "Assume delays are acceptable and do nothing", correct: false },
                    { text: "Review the delay incidents to improve scheduling and procedures", correct: true },
                    { text: "Blame weather entirely and move on", correct: false },
                    { text: "Ignore passenger feedback post-event", correct: false }
                ]
            }
        ]
    }
],

safetyCleanliness: [
    {
        title: "Ensuring Onboard Safety and Cleanliness",
        text: "Swiftly address safety and cleanliness concerns with immediate inspections, ongoing audits, and transparent communication with passengers.",
        steps: [
            {
                question: "As the Alaska Railroad train glides through pristine landscapes, an OnBoard Services Specialist conducts a routine walkthrough, their keen eyes scanning for any safety hazards or cleanliness issues. Equipped with cleaning supplies and a checklist, they move purposefully through each car, ready to address any concerns swiftly to ensure passengers enjoy a safe and comfortable journey: How do you react to reports of unsanitary conditions?",
                options: [
                    { text: "Dismiss the reports as exaggerations", correct: false },
                    { text: "Immediately dispatch cleaning staff for an on-board inspection", correct: true },
                    { text: "Wait until more complaints accumulate", correct: false },
                    { text: "Blame previous shifts without action", correct: false }
                ]
            },
            {
                question: "Safety Assessment: What is your next step after cleaning?",
                options: [
                    { text: "Assume cleanliness equals safety", correct: false },
                    { text: "Conduct a safety audit for restrooms and common areas", correct: true },
                    { text: "Focus solely on aesthetic fixes", correct: false },
                    { text: "Ignore potential hazards", correct: false }
                ]
            },
            {
                question: "Passenger Communication: How do you update the passengers?",
                options: [
                    { text: "Leave them uninformed", correct: false },
                    { text: "Issue regular updates on cleaning measures and safety checks", correct: true },
                    { text: "Inform only when major issues occur", correct: false },
                    { text: "Rely on word-of-mouth updates", correct: false }
                ]
            },
            {
                question: "Maintenance Protocol: How do you address recurring issues?",
                options: [
                    { text: "Perform one-off fixes and hope for the best", correct: false },
                    { text: "Establish and enforce strict maintenance and cleaning protocols", correct: true },
                    { text: "Blame external vendors and do nothing", correct: false },
                    { text: "Schedule irregular cleaning sessions", correct: false }
                ]
            },
            {
                question: "Feedback Integration: How do you ensure continuous improvement?",
                options: [
                    { text: "Stop collecting passenger feedback", correct: false },
                    { text: "Implement regular surveys and adjust procedures accordingly", correct: true },
                    { text: "Assume no further complaints will arise", correct: false },
                    { text: "Rely solely on staff observations", correct: false }
                ]
            }
        ]
    }
],

foodDining: [
    {
        title: "Optimizing Food and Dining Experience",
        text: "Enhance the onboard dining service through quality control, diversified menus, and timely meal delivery while addressing feedback constructively.",
        steps: [
            {
                question: "In the bustling dining car of the Alaska Railroad train, the aroma of freshly prepared pot roast mingles with the excited chatter of passengers enjoying their culinary journey. The dining car manager surveys the scene, noting the efficiency of service, the variety of menu options, and the satisfaction on diners' faces, all while remaining alert for any opportunity to further enhance the onboard dining experience.: How should you start addressing dining issues?",
                options: [
                    { text: "Ignore negative comments about food quality", correct: false },
                    { text: "Gather detailed feedback on meal quality and serving times", correct: true },
                    { text: "Blame kitchen staff immediately", correct: false },
                    { text: "Dismiss comments as passenger fussiness", correct: false }
                ]
            },
            {
                question: "Quality Control: What action should follow feedback collection?",
                options: [
                    { text: "Maintain current meal preparation practices", correct: false },
                    { text: "Implement quality control checks for food temperature and freshness", correct: true },
                    { text: "Lower meal standards to meet minimal expectations", correct: false },
                    { text: "Change the menu without proper testing", correct: false }
                ]
            },
            {
                question: "Menu Diversity: How do you address dietary restrictions?",
                options: [
                    { text: "Offer a one-size-fits-all menu", correct: false },
                    { text: "Expand the menu to include vegetarian, gluten-free, and other options", correct: true },
                    { text: "Ignore dietary needs and hope passengers adjust", correct: false },
                    { text: "Charge extra for any dietary alternative", correct: false }
                ]
            },
            {
                question: "Meal Scheduling: How should serving times be managed?",
                options: [
                    { text: "Serve meals at arbitrary times", correct: false },
                    { text: "Establish and communicate clear meal times to passengers", correct: true },
                    { text: "Let passengers choose when to eat without guidance", correct: false },
                    { text: "Delay meals until issues resolve themselves", correct: false }
                ]
            },
            {
                question: "Service Recovery: What's your final step for dining mishaps?",
                options: [
                    { text: "Offer a generic apology without remedial action", correct: false },
                    { text: "Implement recovery protocols, such as compensatory meal adjustments", correct: true },
                    { text: "Ignore the issue after the meal", correct: false },
                    { text: "Blame passengers for unrealistic expectations", correct: false }
                ]
            }
        ]
    }
],

onboardAmenities: [
    {
        title: "Enhancing Onboard Amenities",
        text: "Improve the travel experience by auditing current facilities, gathering passenger input, planning and executing upgrades, and reviewing satisfaction post-implementation.",
        steps: [
            {
                question: "As the Alaska Railroad train rolls through breathtaking scenery, passengers engage with various onboard amenities, from comfortable seating to entertainment options. An observant OnBoard Services Specialist moves through the cars, discreetly noting usage patterns and passenger reactions, gathering valuable insights to inform future enhancements to the travel experience: What is your first step?",
                options: [
                    { text: "Assume all amenities are adequate", correct: false },
                    { text: "Conduct a thorough audit of seating, lighting, and charging ports", correct: true },
                    { text: "Blame design constraints without investigation", correct: false },
                    { text: "Only inspect premium car amenities", correct: false }
                ]
            },
            {
                question: "Feedback Collection: How should you validate the audit findings?",
                options: [
                    { text: "Ignore passenger input", correct: false },
                    { text: "Survey passengers for detailed feedback on needed improvements", correct: true },
                    { text: "Rely solely on staff opinions", correct: false },
                    { text: "Assume feedback is biased", correct: false }
                ]
            },
            {
                question: "Upgrade Planning: What's the next step?",
                options: [
                    { text: "Delay all upgrades indefinitely", correct: false },
                    { text: "Plan upgrades like charging outlets and ergonomic seating based on feedback", correct: true },
                    { text: "Focus solely on cosmetic improvements", correct: false },
                    { text: "Implement upgrades without testing feasibility", correct: false }
                ]
            },
            {
                question: "Implementation: How do you roll out the improvements?",
                options: [
                    { text: "Announce upgrades with no timeline", correct: false },
                    { text: "Coordinate installations to minimize service disruptions", correct: true },
                    { text: "Replace all amenities at once causing operational chaos", correct: false },
                    { text: "Implement changes without staff training", correct: false }
                ]
            },
            {
                question: "Post-Upgrade Review: How do you ensure sustained quality?",
                options: [
                    { text: "Assume the upgrades will always suffice", correct: false },
                    { text: "Monitor satisfaction through follow-up surveys and adjust as needed", correct: true },
                    { text: "Ignore further feedback", correct: false },
                    { text: "Switch focus immediately to new projects", correct: false }
                ]
            }
        ]
    }
],

narrationCommentary: [
    {
        title: "Improving Narration and Onboard Commentary",
        text: "Enhance the clarity, accuracy, and engagement of onboard narratives through rigorous feedback, training, technical improvements, and content updates.",
        steps: [
            {
                question: "As the Alaska Railroad train winds through a spectacular glacier valley, passengers lean in to catch every word of the onboard narrator's captivating commentary. The Manager of OnBoard Services, seated discreetly at the back, listens intently, evaluating the narration's clarity, accuracy, and ability to engage the diverse group of travelers, always seeking ways to enhance this crucial aspect of the Alaskan rail experience: What is your first move regarding narration concerns?",
                options: [
                    { text: "Assume narrators are performing well", correct: false },
                    { text: "Collect detailed passenger feedback on narration clarity and content", correct: true },
                    { text: "Blame passengers for not paying attention", correct: false },
                    { text: "Ignore minor inaccuracies", correct: false }
                ]
            },
            {
                question: "Training & Accuracy: How do you address factual errors in narration?",
                options: [
                    { text: "Allow narrators to improvise without guidelines", correct: false },
                    { text: "Conduct training sessions focused on accurate and engaging storytelling", correct: true },
                    { text: "Replace narrators immediately without review", correct: false },
                    { text: "Rely solely on scripted content without updates", correct: false }
                ]
            },
            {
                question: "Technical Enhancement: What should be done about audio issues?",
                options: [
                    { text: "Assume the PA system is sufficient", correct: false },
                    { text: "Test and upgrade the sound system for clear delivery", correct: true },
                    { text: "Increase volume without addressing quality", correct: false },
                    { text: "Rely on passengers to use personal devices", correct: false }
                ]
            },
            {
                question: "Content Diversification: How do you improve narrative substance?",
                options: [
                    { text: "Stick with outdated, one-sided scripts", correct: false },
                    { text: "Incorporate diverse, accurate historical and cultural perspectives", correct: true },
                    { text: "Avoid controversial topics altogether", correct: false },
                    { text: "Allow narrators complete freedom without oversight", correct: false }
                ]
            },
            {
                question: "Ongoing Evaluation: How do you maintain narration excellence?",
                options: [
                    { text: "Stop collecting feedback after training", correct: false },
                    { text: "Regularly review feedback and update training and content", correct: true },
                    { text: "Assume improvements are permanent", correct: false },
                    { text: "Only review narration when major complaints arise", correct: false }
                ]
            }
        ]
    }
],
security: [
        {
            title: "Security Threat",
            text: "There is a potential security threat or incident that requires immediate attention.",
            steps: [
                {
                    question: "What is your first step when encountering a security threat?",
                    options: [
                        { text: "Immediately call for evacuation", correct: false },
                        { text: "Post about it on social media", correct: false },
                        { text: "Assess the nature and severity of the threat", correct: true },
                        { text: "Wait for someone else to handle it", correct: false }
                    ]
                },
                {
                    question: "After assessment, what should you do next?",
                    options: [
                        { text: "Try to handle it yourself", correct: false },
                        { text: "Contact ARRC Security with specific details including location", correct: true },
                        { text: "Ask passengers what they think", correct: false },
                        { text: "Continue normal operations", correct: false }
                    ]
                },
                {
                    question: "While waiting for Security to arrive, you should:",
                    options: [
                        { text: "Leave the area unattended", correct: false },
                        { text: "Tell passengers to investigate", correct: false },
                        { text: "Secure the immediate area and prevent passenger access", correct: true },
                        { text: "Take photos of the situation", correct: false }
                    ]
                },
                {
                    question: "Once Security arrives, what's your next step?",
                    options: [
                        { text: "Override their instructions", correct: false },
                        { text: "Follow instructions from Security or Incident Commander", correct: true },
                        { text: "Leave the scene immediately", correct: false },
                        { text: "Make your own decisions", correct: false }
                    ]
                },
                {
                    question: "After the situation is handled, you must:",
                    options: [
                        { text: "Forget about it and move on", correct: false },
                        { text: "Tell other passengers what happened", correct: false },
                        { text: "Document all details and actions in your trip report", correct: true },
                        { text: "Post about it on social media", correct: false }
                    ]
                }
            ]
        }
    ],
    mechanical_02: [
        {
            title: "Mechanical Issue",
            text: "There is a mechanical issue with the train that could impact passenger comfort or safety.",
            steps: [
                {
                    question: "What's your first step when encountering a mechanical issue?",
                    options: [
                        { text: "Immediately call for evacuation", correct: false },
                        { text: "Assess the nature and extent of the mechanical problem", correct: true },
                        { text: "Ignore it and hope it resolves itself", correct: false },
                        { text: "Ask passengers for mechanical advice", correct: false }
                    ]
                },
                {
                    question: "After identifying the issue, what should you do?",
                    options: [
                        { text: "Immediately call for replacement parts", correct: false },
                        { text: "Attempt basic troubleshooting if possible", correct: true },
                        { text: "Tell passengers to fix it themselves", correct: false },
                        { text: "Shut down all systems", correct: false }
                    ]
                },
                {
                    question: "If basic troubleshooting doesn't work, you should:",
                    options: [
                        { text: "Give up and apologize", correct: false },
                        { text: "Try more advanced repairs yourself", correct: false },
                        { text: "Contact the Mechanical Lead with detailed information", correct: true },
                        { text: "Ask passengers for tools", correct: false }
                    ]
                },
                {
                    question: "After contacting the Mechanical Lead, what's next?",
                    options: [
                        { text: "Wait silently for repairs", correct: false },
                        { text: "Follow their instructions and monitor the situation", correct: true },
                        { text: "Make excuses to passengers", correct: false },
                        { text: "Leave the area unattended", correct: false }
                    ]
                },
                {
                    question: "Once the situation is resolved, you must:",
                    options: [
                        { text: "Forget about it", correct: false },
                        { text: "Document the issue and actions in your trip report", correct: true },
                        { text: "Blame others for the problem", correct: false },
                        { text: "Hide the evidence of repairs", correct: false }
                    ]
                }
            ]
        }
    ],
    ticketing: [
        {
            title: "Ticketing Issue",
            text: "There is an issue related to passenger ticketing, boarding, or special assistance needs.",
            steps: [
                {
                    question: "What's your first step when handling a ticketing issue?",
                    options: [
                        { text: "Tell passengers to solve it themselves", correct: false },
                        { text: "Ignore the problem", correct: false },
                        { text: "Assess the specific need (ADA, boarding, seating)", correct: true },
                        { text: "Call security", correct: false }
                    ]
                },
                {
                    question: "After assessment, what should you do?",
                    options: [
                        { text: "Make up new rules", correct: false },
                        { text: "Contact the appropriate ticket window for the location", correct: true },
                        { text: "Tell passengers to come back later", correct: false },
                        { text: "Handle it without assistance", correct: false }
                    ]
                },
                {
                    question: "When contacting the ticket window, you must:",
                    options: [
                        { text: "Be vague about the problem", correct: false },
                        { text: "Provide detailed information about the issue and needs", correct: true },
                        { text: "Complain about the passengers", correct: false },
                        { text: "Make demands", correct: false }
                    ]
                },
                {
                    question: "After receiving instructions, what's next?",
                    options: [
                        { text: "Ignore the instructions", correct: false },
                        { text: "Make up your own solution", correct: false },
                        { text: "Follow ticket window instructions and ensure proper assistance", correct: true },
                        { text: "Leave passengers to figure it out", correct: false }
                    ]
                },
                {
                    question: "Before considering the issue complete, you should:",
                    options: [
                        { text: "Walk away immediately", correct: false },
                        { text: "Confirm the issue was fully resolved", correct: true },
                        { text: "Blame others for any problems", correct: false },
                        { text: "Forget about follow-up", correct: false }
                    ]
                }
            ]
        }
    ],
    baggage: [
        {
            title: "Baggage/Equipment Issue",
            text: "There is an issue with baggage handling, wheelchairs, or other accessibility equipment.",
            steps: [
                {
                    question: "What's your first step with a baggage or equipment issue?",
                    options: [
                        { text: "Tell passengers to handle it themselves", correct: false },
                        { text: "Assess the specific issue (wheelchair, lift, baggage)", correct: true },
                        { text: "Ignore the problem", correct: false },
                        { text: "Call security", correct: false }
                    ]
                },
                {
                    question: "After assessment, what should you do?",
                    options: [
                        { text: "Try to fix equipment yourself", correct: false },
                        { text: "Contact the appropriate baggage office", correct: true },
                        { text: "Tell passengers to wait indefinitely", correct: false },
                        { text: "Leave the area", correct: false }
                    ]
                },
                {
                    question: "When coordinating assistance, you should:",
                    options: [
                        { text: "Leave it to others", correct: false },
                        { text: "Work with baggage lead to coordinate proper assistance", correct: true },
                        { text: "Make passengers figure it out", correct: false },
                        { text: "Ignore special needs", correct: false }
                    ]
                },
                {
                    question: "During the assistance process, you must:",
                    options: [
                        { text: "Leave immediately", correct: false },
                        { text: "Coordinate wheelchair/lift placement and door assistance", correct: true },
                        { text: "Tell passengers to be patient", correct: false },
                        { text: "Handle everything alone", correct: false }
                    ]
                },
                {
                    question: "Before considering the issue resolved, you should:",
                    options: [
                        { text: "Leave without checking", correct: false },
                        { text: "Follow up to ensure all issues were resolved", correct: true },
                        { text: "Assume everything is fine", correct: false },
                        { text: "Tell passengers to check themselves", correct: false }
                    ]
                }
            ]
        }
    ],
    mod: [
        {
            title: "Emergency Requiring MOD",
            text: "There is a severe emergency, medical incident, or other issue that requires MOD attention.",
            steps: [
                {
                    question: "What's your first step in a severe emergency?",
                    options: [
                        { text: "Handle it yourself", correct: false },
                        { text: "Evaluate the severity of the situation", correct: true },
                        { text: "Ignore it", correct: false },
                        { text: "Ask passengers what to do", correct: false }
                    ]
                },
                {
                    question: "After evaluation, what's your next step?",
                    options: [
                        { text: "Try to handle it alone", correct: false },
                        { text: "Contact the MOD immediately", correct: true },
                        { text: "Wait and see what happens", correct: false },
                        { text: "Ask passengers for help", correct: false }
                    ]
                },
                {
                    question: "When contacting the MOD, you must:",
                    options: [
                        { text: "Be vague about details", correct: false },
                        { text: "Provide detailed information about the incident", correct: true },
                        { text: "Minimize the situation", correct: false },
                        { text: "Exaggerate the problem", correct: false }
                    ]
                },
                {
                    question: "After contacting the MOD, what's next?",
                    options: [
                        { text: "Make your own decisions", correct: false },
                        { text: "Follow MOD instructions and prepare for reports", correct: true },
                        { text: "Leave the scene", correct: false },
                        { text: "Ignore their advice", correct: false }
                    ]
                },
                {
                    question: "After the situation is handled, you must:",
                    options: [
                        { text: "Forget about it", correct: false },
                        { text: "Document everything and check follow-up items", correct: true },
                        { text: "Tell other passengers what happened", correct: false },
                        { text: "Avoid paperwork", correct: false }
                    ]
                }
            ]
        }
    ]

};

function showScenario(type) {
    if (!scenarios[type] || scenarios[type].length === 0) {
        console.error(`No scenarios found for category: ${type}`);
        return;
    }

    currentStep = 0;
    currentScenario = scenarios[type][0];
    updateScenarioDisplay();
    document.getElementById('scenarioCard').classList.remove('hidden');
    document.getElementById('categories').style.display = 'none';
}

function updateScenarioDisplay() {
    if (!currentScenario || !currentScenario.steps[currentStep]) {
        console.error("ERROR: Scenario is undefined or missing steps.");
        return;
    }

    const step = currentScenario.steps[currentStep];
    document.getElementById('categoryTitle').textContent = currentScenario.title;
    document.getElementById('scenarioText').textContent = step.question;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    step.options.forEach((option) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;
        button.addEventListener('click', () => selectOption(option, button));
        optionsDiv.appendChild(button);
    });

    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('nextButton').classList.add('hidden');
}

function selectOption(option, button) {
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.disabled = true;
    });

    const feedback = document.getElementById('feedback');
    feedback.textContent = option.correct ? 'Correct! +1 Point' : 'Incorrect! What should you have done?';
    feedback.className = `feedback ${option.correct ? 'correct' : 'incorrect'}`;
    feedback.classList.remove('hidden');

    if (option.correct) {
        currentScore++;
        document.getElementById('scoreDisplay').textContent = currentScore;
        button.classList.add('correct');
    } else {
        mistakes++;
        document.getElementById('mistakesDisplay').textContent = mistakes;
        button.classList.add('selected');
    }

    const nextButton = document.getElementById('nextButton');
    nextButton.classList.remove('hidden');
    nextButton.onclick = () => {
        if (currentStep < currentScenario.steps.length - 1) {
            currentStep++;
            updateScenarioDisplay();
        } else {
            document.getElementById('scenarioCard').classList.add('hidden');
            document.getElementById('categories').style.display = 'grid';
        }
    };
}

 document.addEventListener('DOMContentLoaded', function() {
            const fullscreenImage = document.getElementById('fullscreen-image');
            const mainContent = document.getElementById('main-content');

            fullscreenImage.addEventListener('click', function() {
                fullscreenImage.style.display = 'none';
                mainContent.classList.remove('hidden');
            });
        });
