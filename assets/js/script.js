/**
 * SkillSwap - Main JavaScript
 * A comprehensive skill exchange platform
 * 
 * This file contains all JavaScript functionality for the SkillSwap web application
 * including global functions and page-specific functionality.
 */

// Wait for DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize global components
    initializeGlobalComponents();
    
    // Determine current page and initialize page-specific functionality
    initializePageSpecificFunctionality();
});

/**
 * Global Components and Utilities
 * Functions used across multiple pages
 */

// Initialize components used across all pages
function initializeGlobalComponents() {
    // Initialize Bootstrap tooltips
    initializeTooltips();
    
    // Initialize dark mode
    initializeDarkMode();
    
    // Initialize notifications dropdown
    initializeNotifications();
    
    // Initialize language selector
    initializeLanguageSelector();
    
    // Initialize AI assistant chat
    initializeAIAssistant();
}

// Initialize Bootstrap tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Dark mode toggle functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            // Update toggle icon
            const toggleIcon = this.querySelector('i');
            if (toggleIcon) {
                if (isDarkMode) {
                    toggleIcon.classList.remove('fa-moon');
                    toggleIcon.classList.add('fa-sun');
                } else {
                    toggleIcon.classList.remove('fa-sun');
                    toggleIcon.classList.add('fa-moon');
                }
            }
        });
        
        // Check for saved preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            const toggleIcon = darkModeToggle.querySelector('i');
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-moon');
                toggleIcon.classList.add('fa-sun');
            }
        }
    }
}

// Notifications dropdown functionality
function initializeNotifications() {
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    
    if (notificationsDropdown) {
        // Simulate fetching notifications
        fetchNotifications()
            .then(notifications => {
                // Update notification badge count
                updateNotificationBadge(notifications.length);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
            
        // Mark notifications as read when dropdown is opened
        notificationsDropdown.addEventListener('shown.bs.dropdown', function() {
            // Simulate marking notifications as read
            console.log('Marking notifications as read');
            // In a real app, this would make an API call
        });
    }
}

// Simulate fetching notifications from an API
function fetchNotifications() {
    // This would be an API call in a real application
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, type: 'match', message: 'New Match Found', time: '2m ago' },
                { id: 2, type: 'session', message: 'Session in 15 Minutes', time: '15m ago' },
                { id: 3, type: 'feedback', message: 'You got feedback!', time: '1h ago' }
            ]);
        }, 300);
    });
}

// Update notification badge count
function updateNotificationBadge(count) {
    const badge = document.querySelector('#notificationsDropdown .badge');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
}

// Language selector functionality
function initializeLanguageSelector() {
    const languageSelector = document.getElementById('languageSelector');
    
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            console.log(`Language changed to: ${selectedLanguage}`);
            // In a real app, this would update the UI language
            // and save the preference to localStorage or user settings
        });
    }
}

// AI Assistant chat functionality
function initializeAIAssistant() {
    const aiChatInput = document.querySelector('.modal-body .input-group input');
    const aiChatButton = document.querySelector('.modal-body .input-group button');
    const aiChatContainer = document.querySelector('.chat-container');
    
    if (aiChatInput && aiChatButton && aiChatContainer) {
        aiChatButton.addEventListener('click', function() {
            const message = aiChatInput.value.trim();
            if (message) {
                // Add user message
                addChatMessage(message, 'user');
                aiChatInput.value = '';
                
                // Simulate AI thinking
                setTimeout(() => {
                    // Simulate AI response based on user input
                    let response = '';
                    
                    if (message.toLowerCase().includes('bio')) {
                        response = "Here's a professional bio suggestion: \"Full-stack developer with expertise in JavaScript and Python. Passionate about creating efficient, user-friendly applications and sharing knowledge with others. Experienced mentor with a track record of helping junior developers grow their skills.\"";
                    } else if (message.toLowerCase().includes('python') || message.toLowerCase().includes('learning plan')) {
                        response = "I've created a Python learning plan for you:\n1. Start with Python basics (variables, data types, control flow) - 2 weeks\n2. Move to functions and modules - 1 week\n3. Learn object-oriented programming - 2 weeks\n4. Practice with small projects - 2 weeks\n5. Explore libraries like NumPy and Pandas - 2 weeks\n\nWould you like me to suggest some resources for each step?";
                    } else if (message.toLowerCase().includes('match') || message.toLowerCase().includes('find')) {
                        response = "Based on your profile, I recommend connecting with Sarah Johnson who teaches Python and Data Science. You both have complementary skills and similar availability. Would you like me to show her profile?";
                    } else {
                        response = "I'm here to help with your SkillSwap journey! You can ask me to suggest a good bio for your profile, generate a learning plan for a skill, find matches based on your interests, or recommend resources for your learning journey.";
                    }
                    
                    addChatMessage(response, 'ai');
                }, 1000);
            }
        });
        
        // Allow Enter key to send message
        aiChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                aiChatButton.click();
            }
        });
    }
}

// Add message to AI chat
function addChatMessage(message, sender) {
    const aiChatContainer = document.querySelector('.chat-container');
    if (!aiChatContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'd-flex mb-3';
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="flex-grow-1 me-3">
                <div class="bg-primary p-3 text-white rounded">
                    <p class="mb-0">${message}</p>
                </div>
                <small class="text-muted d-block text-end">Just now</small>
            </div>
            <div class="flex-shrink-0">
                <div class="rounded-circle bg-light p-2" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-user"></i>
                </div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="flex-shrink-0">
                <div class="rounded-circle bg-primary text-white p-2" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-robot"></i>
                </div>
            </div>
            <div class="flex-grow-1 ms-3">
                <div class="bg-light p-3 rounded">
                    <p class="mb-0">${message.replace(/\n/g, '<br>')}</p>
                </div>
                <small class="text-muted">Just now</small>
            </div>
        `;
    }
    
    aiChatContainer.appendChild(messageDiv);
    aiChatContainer.scrollTop = aiChatContainer.scrollHeight;
}

/**
 * Page-Specific Functionality
 * Initialize features based on current page
 */

// Determine current page and initialize relevant functionality
function initializePageSpecificFunctionality() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    
    // Initialize functionality based on current page
    switch(pageName) {
        case '':
        case 'index.html':
            initializeDashboardPage();
            break;
        case 'profile.html':
            initializeProfilePage();
            break;
        case 'match.html':
            initializeMatchPage();
            break;
        case 'sessions.html':
            initializeSessionsPage();
            break;
        case 'chat.html':
            initializeChatPage();
            break;
        case 'resources.html':
            initializeResourcesPage();
            break;
        case 'feedback.html':
            initializeFeedbackPage();
            break;
        default:
            // Default initialization for other pages
            console.log('No specific initialization for this page');
    }
}

/**
 * Dashboard Page Functionality
 */
function initializeDashboardPage() {
    console.log('Initializing Dashboard Page');
    
    // Initialize dashboard stats
    initializeDashboardStats();
    
    // Initialize recent activity feed
    initializeRecentActivity();
    
    // Initialize quick action buttons
    initializeQuickActions();
}

// Initialize dashboard stats with dummy data
function initializeDashboardStats() {
    // Simulate fetching stats data
    const statsData = {
        teachingHours: 24,
        learningHours: 18,
        completedSessions: 12,
        upcomingSessions: 3,
        skillsTaught: 4,
        skillsLearned: 3,
        totalPoints: 250,
        level: 'Intermediate'
    };
    
    // Update stats in the UI
    const statsElements = document.querySelectorAll('[data-stat]');
    statsElements.forEach(element => {
        const statKey = element.getAttribute('data-stat');
        if (statsData[statKey] !== undefined) {
            element.textContent = statsData[statKey];
        }
    });
    
    // Initialize any charts or visualizations
    initializeStatsCharts();
}

// Initialize charts for dashboard stats
function initializeStatsCharts() {
    // This would use a charting library like Chart.js in a real application
    console.log('Initializing dashboard charts');
    
    // For now, we'll just simulate this with a console log
    const chartData = {
        teachingVsLearning: {
            labels: ['Teaching', 'Learning'],
            data: [24, 18]
        },
        sessionsByMonth: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            data: [2, 4, 3, 5, 8]
        }
    };
    
    console.log('Chart data:', chartData);
}

// Initialize recent activity feed
function initializeRecentActivity() {
    const activityContainer = document.querySelector('.recent-activity');
    if (!activityContainer) return;
    
    // Simulate fetching recent activity
    const activities = [
        { type: 'session', message: 'Completed JavaScript session with Emma Wilson', time: '2 hours ago' },
        { type: 'match', message: 'New match with Sarah Johnson for Python', time: '1 day ago' },
        { type: 'feedback', message: 'Received 5-star feedback from Michael Brown', time: '2 days ago' },
        { type: 'resource', message: 'Shared JavaScript Cheat Sheet resource', time: '3 days ago' },
        { type: 'skill', message: 'Added UI/UX Design to learning skills', time: '1 week ago' }
    ];
    
    // Clear existing content
    activityContainer.innerHTML = '';
    
    // Add activity items to the container
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item d-flex align-items-center p-3 border-bottom';
        
        // Determine icon based on activity type
        let icon = '';
        switch(activity.type) {
            case 'session':
                icon = '<i class="fas fa-video text-primary"></i>';
                break;
            case 'match':
                icon = '<i class="fas fa-user-plus text-success"></i>';
                break;
            case 'feedback':
                icon = '<i class="fas fa-star text-warning"></i>';
                break;
            case 'resource':
                icon = '<i class="fas fa-file-alt text-info"></i>';
                break;
            case 'skill':
                icon = '<i class="fas fa-graduation-cap text-secondary"></i>';
                break;
            default:
                icon = '<i class="fas fa-bell text-muted"></i>';
        }
        
        activityItem.innerHTML = `
            <div class="activity-icon me-3">
                ${icon}
            </div>
            <div class="activity-content flex-grow-1">
                <p class="mb-0">${activity.message}</p>
                <small class="text-muted">${activity.time}</small>
            </div>
        `;
        
        activityContainer.appendChild(activityItem);
    });
}

// Initialize quick action buttons
function initializeQuickActions() {
    // Find a Match button
    const findMatchBtn = document.querySelector('.btn[data-action="find-match"]');
    if (findMatchBtn) {
        findMatchBtn.addEventListener('click', function() {
            window.location.href = 'match.html';
        });
    }
    
    // Add a Skill button
    const addSkillBtn = document.querySelector('.btn[data-action="add-skill"]');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', function() {
            window.location.href = 'profile.html#skills-section';
        });
    }
    
    // Book a Session button
    const bookSessionBtn = document.querySelector('.btn[data-action="book-session"]');
    if (bookSessionBtn) {
        bookSessionBtn.addEventListener('click', function() {
            window.location.href = 'sessions.html';
        });
    }
}

/**
 * Profile Page Functionality
 */
function initializeProfilePage() {
    console.log('Initializing Profile Page');
    
    // Initialize profile form
    initializeProfileForm();
    
    // Initialize skill management
    initializeSkillManagement();
    
    // Initialize profile statistics
    initializeProfileStats();
}

// Initialize profile form with validation
function initializeProfileForm() {
    const profileForm = document.getElementById('profileForm');
    if (!profileForm) return;
    
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateProfileForm()) {
            // Simulate saving profile
            showSavingIndicator();
            
            setTimeout(() => {
                // Simulate successful save
                showSuccessMessage('Profile updated successfully!');
            }, 1500);
        }
    });
}

// Validate profile form inputs
function validateProfileForm() {
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const bioInput = document.getElementById('bio');
    
    let isValid = true;
    
    // Reset previous error states
    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    
    // Validate name
    if (nameInput && nameInput.value.trim() === '') {
        nameInput.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate email
    if (emailInput && (!emailInput.value.trim() || !isValidEmail(emailInput.value))) {
        emailInput.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate bio (optional)
    if (bioInput && bioInput.value.trim().length > 500) {
        bioInput.classList.add('is-invalid');
        isValid = false;
    }
    
    return isValid;
}

// Check if email is valid
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show saving indicator
function showSavingIndicator() {
    const saveBtn = document.querySelector('#profileForm button[type="submit"]');
    if (!saveBtn) return;
    
    const originalText = saveBtn.innerHTML;
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Saving...';
    
    // Reset button after saving
    setTimeout(() => {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalText;
    }, 1500);
}

// Show success message
function showSuccessMessage(message) {
    // Create alert element
    const alertEl = document.createElement('div');
    alertEl.className = 'alert alert-success alert-dismissible fade show';
    alertEl.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Find container to insert alert
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertEl, container.firstChild);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alertEl.classList.remove('show');
            setTimeout(() => alertEl.remove(), 150);
        }, 5000);
    }
}

// Initialize skill management
function initializeSkillManagement() {
    // Teaching skills
    initializeSkillSection('teaching');
    
    // Learning skills
    initializeSkillSection('learning');
}

// Initialize skill section (teaching or learning)
function initializeSkillSection(type) {
    const addSkillBtn = document.querySelector(`.add-${type}-skill-btn`);
    if (!addSkillBtn) return;
    
    addSkillBtn.addEventListener('click', function() {
        const skillSelect = document.getElementById(`${type}SkillSelect`);
        const levelSelect = document.getElementById(`${type}LevelSelect`);
        
        if (skillSelect && levelSelect && skillSelect.value) {
            // Add the skill to the list
            addSkillToList(type, skillSelect.value, levelSelect.value);
            
            // Reset selects
            skillSelect.value = '';
            levelSelect.value = 'Beginner';
        }
    });
    
    // Initialize remove skill buttons
    document.querySelectorAll(`.${type}-skills-list .remove-skill`).forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.skill-item').remove();
        });
    });
}

// Add skill to list
function addSkillToList(type, skill, level) {
    const skillsList = document.querySelector(`.${type}-skills-list`);
    if (!skillsList) return;
    
    // Create skill item
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item d-flex justify-content-between align-items-center p-2 border rounded mb-2';
    
    // Determine badge color based on level
    let badgeColor = 'bg-secondary';
    switch(level) {
        case 'Beginner':
            badgeColor = 'bg-info';
            break;
        case 'Intermediate':
            badgeColor = 'bg-primary';
            break;
        case 'Advanced':
            badgeColor = 'bg-success';
            break;
        case 'Expert':
            badgeColor = 'bg-warning';
            break;
    }
    
    skillItem.innerHTML = `
        <div>
            <span class="fw-bold">${skill}</span>
            <span class="badge ${badgeColor} ms-2">${level}</span>
        </div>
        <button type="button" class="btn btn-sm btn-outline-danger remove-skill">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add event listener to remove button
    skillItem.querySelector('.remove-skill').addEventListener('click', function() {
        skillItem.remove();
    });
    
    // Add to list
    skillsList.appendChild(skillItem);
}

// Initialize profile statistics
function initializeProfileStats() {
    // This would fetch and display user statistics in a real app
    console.log('Initializing profile statistics');
}

/**
 * Match Page Functionality
 */
function initializeMatchPage() {
    console.log('Initializing Match Page');
    
    // Initialize filter sidebar
    initializeFilterSidebar();
    
    // Initialize search functionality
    initializeMatchSearch();
    
    // Initialize match cards
    initializeMatchCards();
    
    // Initialize rating range slider
    initializeRatingRangeSlider();
}

// Initialize filter sidebar
function initializeFilterSidebar() {
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    const filterSidebar = document.getElementById('filterSidebar');
    
    if (filterToggleBtn && filterSidebar) {
        filterToggleBtn.addEventListener('click', function() {
            filterSidebar.classList.toggle('show');
        });
    }
    
    // Apply filters button
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Collect filter values
            const filters = collectFilterValues();
            
            // Apply filters to match results
            applyFiltersToMatches(filters);
            
            // Close sidebar on mobile
            if (window.innerWidth < 992) {
                filterSidebar.classList.remove('show');
            }
        });
    }
    
    // Reset filters button
    const resetFiltersBtn = document.getElementById('resetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            // Reset all filter inputs
            document.querySelectorAll('#filterSidebar input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = true;
            });
            
            document.querySelectorAll('#filterSidebar select').forEach(select => {
                select.selectedIndex = 0;
            });
            
            const ratingRange = document.getElementById('ratingRange');
            if (ratingRange) {
                ratingRange.value = 3;
                const ratingValue = document.getElementById('ratingValue');
                if (ratingValue) {
                    ratingValue.textContent = '3+';
                }
            }
            
            // Apply reset filters
            applyFiltersToMatches({});
        });
    }
}

// Collect filter values from sidebar
function collectFilterValues() {
    const filters = {
        skills: [],
        availability: [],
        teachingMode: [],
        minRating: 0
    };
    
    // Collect selected skills
    document.querySelectorAll('#skillFilters input[type="checkbox"]:checked').forEach(checkbox => {
        filters.skills.push(checkbox.value);
    });
    
    // Collect availability
    document.querySelectorAll('#availabilityFilters input[type="checkbox"]:checked').forEach(checkbox => {
        filters.availability.push(checkbox.value);
    });
    
    // Collect teaching mode
    document.querySelectorAll('#teachingModeFilters input[type="checkbox"]:checked').forEach(checkbox => {
        filters.teachingMode.push(checkbox.value);
    });
    
    // Get minimum rating
    const ratingRange = document.getElementById('ratingRange');
    if (ratingRange) {
        filters.minRating = parseInt(ratingRange.value);
    }
    
    return filters;
}

// Apply filters to match results
function applyFiltersToMatches(filters) {
    console.log('Applying filters:', filters);
    
    // In a real app, this would fetch filtered results from the server
    // For now, we'll simulate filtering the existing cards
    
    const matchCards = document.querySelectorAll('.match-card');
    matchCards.forEach(card => {
        let visible = true;
        
        // Check if card matches filters
        if (filters.skills && filters.skills.length > 0) {
            const cardSkills = card.getAttribute('data-skills')?.split(',') || [];
            if (!filters.skills.some(skill => cardSkills.includes(skill))) {
                visible = false;
            }
        }
        
        if (filters.minRating) {
            const cardRating = parseFloat(card.getAttribute('data-rating') || 0);
            if (cardRating < filters.minRating) {
                visible = false;
            }
        }
        
        // Show or hide card based on filter match
        card.style.display = visible ? 'block' : 'none';
    });
}

// Initialize match search functionality
function initializeMatchSearch() {
    const searchInput = document.getElementById('matchSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Filter match cards based on search term
        const matchCards = document.querySelectorAll('.match-card');
        matchCards.forEach(card => {
            const name = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const skills = card.getAttribute('data-skills')?.toLowerCase() || '';
            
            if (name.includes(searchTerm) || skills.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize match cards
function initializeMatchCards() {
    // Add event listeners to "Request Match" buttons
    document.querySelectorAll('.request-match-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const userName = this.closest('.match-card').querySelector('.card-title').textContent;
            
            // Show confirmation modal
            const modal = new bootstrap.Modal(document.getElementById('matchRequestModal'));
            
            // Update modal content with user name
            const modalUserName = document.getElementById('matchRequestUserName');
            if (modalUserName) {
                modalUserName.textContent = userName;
            }
            
            modal.show();
        });
    });
    
    // Handle match request form submission
    const matchRequestForm = document.getElementById('matchRequestForm');
    if (matchRequestForm) {
        matchRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate sending match request
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            
            setTimeout(() => {
                // Hide modal
                bootstrap.Modal.getInstance(document.getElementById('matchRequestModal')).hide();
                
                // Show success message
                showSuccessMessage('Match request sent successfully!');
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }
}

// Initialize rating range slider
function initializeRatingRangeSlider() {
    const ratingRange = document.getElementById('ratingRange');
    const ratingValue = document.getElementById('ratingValue');

    if (ratingRange && ratingValue) {
        ratingRange.addEventListener('input', function() {
            ratingValue.textContent = this.value + '+';
        });
    }
}

/**
 * Sessions Page Functionality
 */
function initializeSessionsPage() {
    console.log('Initializing Sessions Page');
    
    // Initialize calendar
    initializeCalendar();
    
    // Initialize session booking form
    initializeSessionBooking();
    
    // Initialize session actions (join, reschedule, cancel)
    initializeSessionActions();
    
    // Initialize time zone adjustment
    initializeTimeZoneAdjustment();
}

// Calendar initialization function
function initializeCalendar() {
    const calendarContainer = document.getElementById('calendarContainer');

    if (!calendarContainer) return;

    // Get current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Update calendar header
    const calendarMonthYear = document.getElementById('calendarMonthYear');
    if (calendarMonthYear) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        calendarMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

    // Generate calendar days
    generateCalendarDays(currentDate);

    // Add event listeners for prev/next month
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar(currentDate);
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar(currentDate);
        });
    }
}

// Generate calendar days
function generateCalendarDays(date) {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;

    // Clear existing content
    calendarGrid.innerHTML = '';

    // Get first day of month and total days
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const totalDays = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Create day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const headerRow = document.createElement('div');
    headerRow.className = 'row text-center fw-bold mb-2';

    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'col';
        dayHeader.textContent = day;
        headerRow.appendChild(dayHeader);
    });

    calendarGrid.appendChild(headerRow);

    // Create calendar grid
    let dayCount = 1;
    const today = new Date();

    // Sample events data (in a real app, this would come from an API)
    const events = [
        { day: 5, title: 'JavaScript Basics', type: 'teaching', time: '3:00 PM' },
        { day: 8, title: 'Python Data Analysis', type: 'learning', time: '10:00 AM' },
        { day: 12, title: 'UI/UX Design', type: 'learning', time: '2:30 PM' },
        { day: 15, title: 'HTML/CSS Workshop', type: 'teaching', time: '4:00 PM' },
        { day: 20, title: 'React Fundamentals', type: 'teaching', time: '1:00 PM' }
    ];

    // Create weeks
    for (let i = 0; i < 6; i++) {
        // Skip last row if not needed
        if (i > 0 && dayCount > totalDays) break;
        
        const weekRow = document.createElement('div');
        weekRow.className = 'row mb-2';
        
        // Create days in the week
        for (let j = 0; j < 7; j++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'col px-1';
            
            const dayCellContent = document.createElement('div');
            dayCellContent.className = 'calendar-day rounded p-1';
            
            // Add day number if it's a valid day
            if ((i === 0 && j < startingDay) || dayCount > totalDays) {
                // Empty cell
                dayCellContent.classList.add('bg-light', 'bg-opacity-50');
            } else {
                // Add day number
                const dayNumber = document.createElement('div');
                dayNumber.className = 'd-flex justify-content-between align-items-center mb-1';
                
                const daySpan = document.createElement('span');
                daySpan.textContent = dayCount;
                
                // Highlight today
                if (today.getDate() === dayCount && 
                    today.getMonth() === date.getMonth() && 
                    today.getFullYear() === date.getFullYear()) {
                    daySpan.className = 'badge bg-primary rounded-circle';
                }
                
                dayNumber.appendChild(daySpan);
                dayCellContent.appendChild(dayNumber);
                
                // Add events for this day
                const dayEvents = events.filter(event => event.day === dayCount);
                dayEvents.forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.className = `calendar-event calendar-event-${event.type} small`;
                    eventDiv.textContent = `${event.time} - ${event.title}`;
                    eventDiv.setAttribute('data-bs-toggle', 'tooltip');
                    eventDiv.setAttribute('title', `${event.title} (${event.time})`);
                    dayCellContent.appendChild(eventDiv);
                });
                
                dayCount++;
            }
            
            dayCell.appendChild(dayCellContent);
            weekRow.appendChild(dayCell);
        }
        
        calendarGrid.appendChild(weekRow);
    }

    // Re-initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Update calendar when month changes
function updateCalendar(date) {
    const calendarMonthYear = document.getElementById('calendarMonthYear');
    if (calendarMonthYear) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        calendarMonthYear.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }

    generateCalendarDays(date);
}

// Initialize session booking form
function initializeSessionBooking() {
    const bookSessionForm = document.querySelector('#bookSessionModal form');
    if (!bookSessionForm) return;
    
    bookSessionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateSessionForm(this)) {
            // Simulate booking session
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Booking...';
            
            setTimeout(() => {
                // Hide modal
                bootstrap.Modal.getInstance(document.getElementById('bookSessionModal')).hide();
                
                // Show success message
                showSuccessMessage('Session booked successfully!');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        }
    });
}

// Validate session booking form
function validateSessionForm(form) {
    const skillSelect = form.querySelector('#sessionSkill');
    const partnerSelect = form.querySelector('#sessionPartner');
    const dateInput = form.querySelector('#sessionDate');
    const timeInput = form.querySelector('#sessionTime');
    
    let isValid = true;
    
    // Reset previous error states
    form.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    
    // Validate skill
    if (skillSelect && skillSelect.value === '') {
        skillSelect.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate partner
    if (partnerSelect && partnerSelect.value === '') {
        partnerSelect.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate date
    if (dateInput && dateInput.value === '') {
        dateInput.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate time
    if (timeInput && timeInput.value === '') {
        timeInput.classList.add('is-invalid');
        isValid = false;
    }
    
    return isValid;
}

// Initialize session actions
function initializeSessionActions() {
    // Join session button
    const startCallButton = document.getElementById('startCallButton');
    const videoContainer = document.getElementById('videoContainer');

    if (startCallButton && videoContainer) {
        startCallButton.addEventListener('click', function() {
            // Change button state
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Connecting...';
            
            // Simulate connection delay
            setTimeout(() => {
                // Update video container
                videoContainer.innerHTML = `
                    <div class="video-placeholder bg-dark">
                        <div class="text-center">
                            <i class="fas fa-video fa-3x mb-3"></i>
                            <h5>Video Call Connected</h5>
                            <p class="mb-0">This is a placeholder for the WebRTC video call</p>
                        </div>
                    </div>
                    <div class="call-controls mt-3 d-flex justify-content-center gap-2">
                        <button class="btn btn-light rounded-circle" title="Mute">
                            <i class="fas fa-microphone"></i>
                        </button>
                        <button class="btn btn-light rounded-circle" title="Turn off camera">
                            <i class="fas fa-video"></i>
                        </button>
                        <button class="btn btn-light rounded-circle" title="Share screen">
                            <i class="fas fa-desktop"></i>
                        </button>
                        <button class="btn btn-danger rounded-circle" title="End call">
                            <i class="fas fa-phone-slash"></i>
                        </button>
                    </div>
                `;
                
                // Update button
                this.innerHTML = '<i class="fas fa-phone-alt me-2"></i> Connected';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
            }, 2000);
        });
    }
    
    // Reschedule session form
    const rescheduleForm = document.querySelector('#rescheduleSessionModal form');
    if (rescheduleForm) {
        rescheduleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate rescheduling
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Rescheduling...';
            
            setTimeout(() => {
                // Hide modal
                bootstrap.Modal.getInstance(document.getElementById('rescheduleSessionModal')).hide();
                
                // Show success message
                showSuccessMessage('Session rescheduled successfully!');
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }
    
    // Cancel session form
    const cancelForm = document.querySelector('#cancelSessionModal form');
    if (cancelForm) {
        cancelForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate cancellation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Cancelling...';
            
            setTimeout(() => {
                // Hide modal
                bootstrap.Modal.getInstance(document.getElementById('cancelSessionModal')).hide();
                
                // Show success message
                showSuccessMessage('Session cancelled successfully.');
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }
}

// Initialize time zone adjustment
function initializeTimeZoneAdjustment() {
    const timeZoneSelect = document.getElementById('timeZone');
    const sessionTimeInputs = document.querySelectorAll('.session-time');

    if (timeZoneSelect && sessionTimeInputs.length > 0) {
        timeZoneSelect.addEventListener('change', function() {
            const selectedZone = this.value;
            // This would normally do actual time zone conversion
            // For demo purposes, we'll just update the display
            sessionTimeInputs.forEach(input => {
                const originalTime = input.getAttribute('data-original-time');
                input.textContent = `${originalTime} (${selectedZone})`;
            });
        });
    }
}

/**
 * Chat Page Functionality
 */
function initializeChatPage() {
    console.log('Initializing Chat Page');
    
    // Initialize conversation list
    initializeConversationList();
    
    // Initialize message input
    initializeMessageInput();
    
    // Initialize AI icebreaker
    initializeAIIcebreaker();
}

// Initialize conversation list
function initializeConversationList() {
    const conversationItems = document.querySelectorAll('.list-group-item-action');
    
    conversationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            conversationItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // In a real app, this would load the conversation
            // For now, we'll just simulate it
            const userName = this.querySelector('h6').textContent;
            
            // Update chat header
            const chatHeader = document.querySelector('.card-header h5');
            if (chatHeader) {
                chatHeader.textContent = userName;
            }
            
            // Simulate loading conversation
            const chatBody = document.querySelector('.card-body');
            if (chatBody) {
                chatBody.innerHTML = '<div class="text-center p-4"><i class="fas fa-spinner fa-spin fa-2x"></i><p class="mt-2">Loading conversation...</p></div>';
                
                setTimeout(() => {
                    // Load dummy conversation
                    loadDummyConversation(userName);
                }, 1000);
            }
        });
    });
}

// Load dummy conversation
function loadDummyConversation(userName) {
    const chatBody = document.querySelector('.card-body');
    if (!chatBody) return;
    
    // Generate dummy conversation based on user
    let conversation = [];
    
    switch(userName) {
        case 'Emma Wilson':
            conversation = [
                { sender: 'them', message: "Hi Alex! I'm looking forward to our JavaScript session today. I've been reviewing the basics but still have questions about functions and scope.", time: '10:15 AM' },
                { sender: 'me', message: "Hey Emma! No problem at all. We'll definitely cover functions and scope in detail. Do you have any specific examples you're struggling with?", time: '10:17 AM' },
                { sender: 'them', message: "Yes, I'm confused about the difference between var, let, and const. Also, I don't fully understand how closures work.", time: '10:20 AM' },
                { sender: 'me', message: "Those are great topics to cover! I'll prepare some examples to demonstrate the differences between var, let, and const. And closures are a bit tricky but super useful once you understand them.", time: '10:22 AM' },
                { sender: 'them', message: "I tried writing this function but it's not working as expected:\n\nfunction counter() {\n  var count = 0;\n  return count++;\n}\n\nconsole.log(counter()); // Always returns 0\nconsole.log(counter()); // Still returns 0", time: '10:25 AM', code: true },
                { sender: 'me', message: "Ah, I see the issue. Your function creates a new 'count' variable each time it's called. Here's how you can fix it with a closure:\n\nfunction createCounter() {\n  var count = 0;\n  return function() {\n    return count++;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // Returns 0\nconsole.log(counter()); // Returns 1\n\nWe'll go through this in detail during our session!", time: '10:28 AM', code: true },
                { sender: 'them', message: "That makes so much more sense! I'm looking forward to our session at 3:00 PM. Thanks for the quick explanation!", time: '10:30 AM' }
            ];
            break;
        case 'Sarah Johnson':
            conversation = [
                { sender: 'them', message: "Hi Alex! I was wondering if you could help me with Python data analysis?", time: '1:05 PM' },
                { sender: 'me', message: "Hi Sarah! I'd be happy to help. What specific areas are you looking to learn?", time: '1:10 PM' },
                { sender: 'them', message: "I'm trying to understand pandas DataFrames and how to manipulate data efficiently.", time: '1:12 PM' },
                { sender: 'me', message: "That's a great topic to cover. Pandas is incredibly powerful for data analysis. When are you free for a session?", time: '1:15 PM' },
                { sender: 'them', message: "I can do tomorrow at 10:00 AM if that works for you?", time: '1:17 PM' },
                { sender: 'me', message: "10:00 AM tomorrow works perfectly. I'll prepare some examples with real datasets so you can see how to apply these concepts.", time: '1:20 PM' },
                { sender: 'them', message: "That sounds perfect! Looking forward to it. Thanks Alex!", time: '1:22 PM' }
            ];
            break;
        default:
            conversation = [
                { sender: 'them', message: `Hi Alex! Thanks for connecting on SkillSwap.`, time: '12:00 PM' },
                { sender: 'me', message: `Hi ${userName}! Happy to connect. How can I help you today?`, time: '12:05 PM' },
                { sender: 'them', message: "I saw you teach JavaScript. I've been trying to learn but finding it challenging.", time: '12:07 PM' },
                { sender: 'me', message: "It can definitely be tricky at first. Would you like to schedule a session to go through some basics?", time: '12:10 PM' },
                { sender: 'them', message: "That would be great! When are you available?", time: '12:12 PM' }
            ];
    }
    
    // Clear chat body
    chatBody.innerHTML = '';
    
    // Add date separator
    const dateSeparator = document.createElement('div');
    dateSeparator.className = 'text-center mb-3';
    dateSeparator.innerHTML = '<span class="badge bg-light text-dark">Today</span>';
    chatBody.appendChild(dateSeparator);
    
    // Add messages
    conversation.forEach(msg => {
        const messageDiv = document.createElement('div');
        
        if (msg.sender === 'me') {
            messageDiv.className = 'd-flex justify-content-end mb-4';
            messageDiv.innerHTML = `
                <div class="text-end">
                    <div class="bg-primary text-white rounded p-3">
                        ${msg.code 
                            ? `<p class="mb-2">${msg.message.split('\n\n')[0]}</p>
                               <pre class="bg-dark text-light p-2 rounded"><code>${msg.message.split('\n\n')[1]}</code></pre>`
                            : `<p class="mb-0">${msg.message}</p>`
                        }
                    </div>
                    <small class="text-muted">${msg.time}</small>
                </div>
            `;
        } else {
            messageDiv.className = 'd-flex mb-4';
            messageDiv.innerHTML = `
                <img src="https://ui-avatars.com/api/?name=${userName.replace(' ', '+')}&background=random" alt="User" class="rounded-circle align-self-start me-3" width="36" height="36">
                <div>
                    <div class="bg-light rounded p-3">
                        ${msg.code 
                            ? `<p class="mb-2">${msg.message.split('\n\n')[0]}</p>
                               <pre class="bg-dark text-light p-2 rounded"><code>${msg.message.split('\n\n')[1]}</code></pre>`
                            : `<p class="mb-0">${msg.message}</p>`
                        }
                    </div>
                    <small class="text-muted">${msg.time}</small>
                </div>
            `;
        }
        
        chatBody.appendChild(messageDiv);
    });
    
    // Add typing indicator for active conversations
    if (userName === 'Emma Wilson') {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'd-flex';
        typingDiv.innerHTML = `
            <img src="https://ui-avatars.com/api/?name=${userName.replace(' ', '+')}&background=random" alt="User" class="rounded-circle align-self-start me-3" width="36" height="36">
            <div class="bg-light rounded p-3">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatBody.appendChild(typingDiv);
    }
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Initialize message input
function initializeMessageInput() {
    const messageForm = document.querySelector('.card-footer .input-group');
    if (!messageForm) return;
    
    const messageInput = messageForm.querySelector('input');
    const sendButton = messageForm.querySelector('button');
    
    // Send message on button click
    sendButton.addEventListener('click', function() {
        sendMessage(messageInput.value);
    });
    
    // Send message on Enter key
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage(this.value);
        }
    });
}

// Send message function
function sendMessage(message) {
    if (!message.trim()) return;
    
    const chatBody = document.querySelector('.card-body');
    if (!chatBody) return;
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'd-flex justify-content-end mb-4';
    messageDiv.innerHTML = `
        <div class="text-end">
            <div class="bg-primary text-white rounded p-3">
                <p class="mb-0">${message}</p>
            </div>
            <small class="text-muted">Just now</small>
        </div>
    `;
    
    // Add to chat
    chatBody.appendChild(messageDiv);
    
    // Clear input
    const messageInput = document.querySelector('.card-footer .input-group input');
    if (messageInput) {
        messageInput.value = '';
    }
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Simulate reply after delay
    setTimeout(() => {
        // Remove typing indicator if exists
        const typingIndicator = chatBody.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.closest('.d-flex').remove();
        }
        
        // Get active conversation user
        const activeUser = document.querySelector('.list-group-item-action.active h6');
        if (!activeUser) return;
        
        const userName = activeUser.textContent;
        
        // Create reply element
        const replyDiv = document.createElement('div');
        replyDiv.className = 'd-flex mb-4';
        replyDiv.innerHTML = `
            <img src="https://ui-avatars.com/api/?name=${userName.replace(' ', '+')}&background=random" alt="User" class="rounded-circle align-self-start me-3" width="36" height="36">
            <div>
                <div class="bg-light rounded p-3">
                    <p class="mb-0">Thanks for your message! I'll get back to you shortly.</p>
                </div>
                <small class="text-muted">Just now</small>
            </div>
        `;
        
        // Add to chat
        chatBody.appendChild(replyDiv);
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1500);
}

// Initialize AI icebreaker
function initializeAIIcebreaker() {
    const icebreakers = document.querySelectorAll('#aiIcebreakerModal .list-group-item');
    const useSelectedBtn = document.querySelector('#aiIcebreakerModal .btn-primary');
    
    // Track selected icebreaker
    let selectedIcebreaker = null;
    
    // Add click event to icebreakers
    icebreakers.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            icebreakers.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Store selected icebreaker
            selectedIcebreaker = this.textContent.trim();
        });
    });
    
    // Use selected icebreaker
    if (useSelectedBtn) {
        useSelectedBtn.addEventListener('click', function() {
            if (!selectedIcebreaker) return;
            
            // Hide modal
            bootstrap.Modal.getInstance(document.getElementById('aiIcebreakerModal')).hide();
            
            // Set message input value
            const messageInput = document.querySelector('.card-footer .input-group input');
            if (messageInput) {
                messageInput.value = selectedIcebreaker;
                messageInput.focus();
            }
        });
    }
}

/**
 * Resources Page Functionality
 */
function initializeResourcesPage() {
    console.log('Initializing Resources Page');
    
    // Initialize resource filters
    initializeResourceFilters();
    
    // Initialize resource upload form
    initializeResourceUpload();
    
    // Initialize resource voting
    initializeResourceVoting();
}

// Initialize resource filters
function initializeResourceFilters() {
    const filterForm = document.querySelector('#filterSidebar form');
    if (!filterForm) return;
    
    // Apply filters button
    const applyFiltersBtn = filterForm.querySelector('button[type="button"]');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Collect filter values
            const filters = {
                search: document.getElementById('searchResource')?.value || '',
                types: [],
                category: document.getElementById('skillCategory')?.value || '',
                levels: [],
                sort: document.getElementById('sortBy')?.value || 'Most Recent'
            };
            
            // Collect resource types
            document.querySelectorAll('#filterSidebar input[type="checkbox"][id^="type"]:checked').forEach(checkbox => {
                filters.types.push(checkbox.id.replace('type', '').toLowerCase());
            });
            
            // Collect skill levels
            document.querySelectorAll('#filterSidebar input[type="checkbox"][id^="level"]:checked').forEach(checkbox => {
                filters.levels.push(checkbox.id.replace('level', '').toLowerCase());
            });
            
            // Apply filters
            console.log('Applying resource filters:', filters);
            
            // In a real app, this would fetch filtered resources from the server
            // For now, we'll simulate filtering the existing cards
            filterResourceCards(filters);
        });
    }
    
    // Search input
    const searchInput = document.getElementById('searchResource');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            // Filter resource cards based on search term
            const resourceCards = document.querySelectorAll('.resource-card');
            resourceCards.forEach(card => {
                const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
                const tags = card.querySelector('.small.text-muted')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
                    card.closest('.col-md-6').style.display = 'block';
                } else {
                    card.closest('.col-md-6').style.display = 'none';
                }
            });
        });
    }
}

// Filter resource cards
function filterResourceCards(filters) {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        let visible = true;
        
        // Check if card matches filters
        const cardTitle = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const cardDescription = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
        const cardTags = card.querySelector('.small.text-muted')?.textContent.toLowerCase() || '';
        const cardType = card.querySelector('.resource-icon i').className.includes('pdf') ? 'pdf' : 
                         card.querySelector('.resource-icon i').className.includes('video') ? 'video' : 
                         card.querySelector('.resource-icon i').className.includes('link') ? 'link' : 'code';
        
        // Check search term
        if (filters.search && !(cardTitle.includes(filters.search.toLowerCase()) || 
                               cardDescription.includes(filters.search.toLowerCase()) || 
                               cardTags.includes(filters.search.toLowerCase()))) {
            visible = false;
        }
        
        // Check resource type
        if (filters.types.length > 0 && !filters.types.includes(cardType)) {
            visible = false;
        }
        
        // Check category
        if (filters.category && !cardTags.includes(filters.category.toLowerCase())) {
            visible = false;
        }
        
        // Check skill level
        if (filters.levels.length > 0) {
            const hasMatchingLevel = filters.levels.some(level => cardTags.includes(level));
            if (!hasMatchingLevel) {
                visible = false;
            }
        }
        
        // Show or hide card based on filter match
        card.closest('.col-md-6').style.display = visible ? 'block' : 'none';
    });
}

// Initialize resource upload form
function initializeResourceUpload() {
    const uploadForm = document.querySelector('#uploadResourceModal form');
    if (!uploadForm) return;
    
    // Resource type change
    const resourceTypeSelect = document.getElementById('resourceType');
    const resourceFileInput = document.getElementById('resourceFile');
    const resourceLinkInput = document.getElementById('resourceLink');
    
    if (resourceTypeSelect && resourceFileInput && resourceLinkInput) {
        resourceTypeSelect.addEventListener('change', function() {
            const selectedType = this.value;
            
            if (selectedType === 'Link / Article') {
                resourceFileInput.parentElement.style.display = 'none';
                resourceLinkInput.parentElement.style.display = 'block';
            } else {
                resourceFileInput.parentElement.style.display = 'block';
                resourceLinkInput.parentElement.style.display = 'none';
            }
        });
    }
    
    // Form submission
    const submitBtn = uploadForm.querySelector('button[type="button"].btn-primary');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            // Validate form
            if (validateResourceForm(uploadForm)) {
                // Simulate uploading resource
                this.disabled = true;
                this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Uploading...';
                
                setTimeout(() => {
                    // Hide modal
                    bootstrap.Modal.getInstance(document.getElementById('uploadResourceModal')).hide();
                    
                    // Show success message
                    showSuccessMessage('Resource uploaded successfully!');
                    
                    // Reset form
                    uploadForm.reset();
                    
                    // Reset button
                    this.disabled = false;
                    this.innerHTML = 'Upload Resource';

                    // Simulate adding new resource to the page
                    const resourceTitle = document.getElementById('resourceTitle').value;
                    const resourceType = document.getElementById('resourceType').value;
                    const resourceDescription = document.getElementById('resourceDescription').value;
                    const resourceCategory = document.getElementById('resourceCategory').value;
                    const resourceLevel = document.getElementById('resourceLevel').value;
                    const resourceTags = document.getElementById('resourceTags').value;
                    
                    addNewResourceCard(resourceTitle, resourceType, resourceDescription, resourceCategory, resourceLevel, resourceTags);
                }, 2000);
            }
        });
    }
}

// Validate resource upload form
function validateResourceForm(form) {
    const titleInput = form.querySelector('#resourceTitle');
    const descriptionInput = form.querySelector('#resourceDescription');
    const typeSelect = form.querySelector('#resourceType');
    const fileInput = form.querySelector('#resourceFile');
    const linkInput = form.querySelector('#resourceLink');
    
    let isValid = true;
    
    // Reset previous error states
    form.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    
    // Validate title
    if (!titleInput.value.trim()) {
        titleInput.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate description
    if (!descriptionInput.value.trim()) {
        descriptionInput.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate file or link based on type
    if (typeSelect.value === 'Link / Article') {
        if (!linkInput.value.trim() || !isValidUrl(linkInput.value)) {
            linkInput.classList.add('is-invalid');
            isValid = false;
        }
    } else {
        if (fileInput.files.length === 0) {
            fileInput.classList.add('is-invalid');
            isValid = false;
        }
    }
    
    return isValid;
}

// Check if URL is valid
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// Add new resource card to the page
function addNewResourceCard(title, type, description, category, level, tags) {
    const resourcesGrid = document.querySelector('.row:has(.resource-card)');
    if (!resourcesGrid) return;
    
    // Create new column
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    // Determine icon based on type
    let iconClass = '';
    let iconBgClass = '';
    
    switch(type) {
        case 'PDF Document':
            iconClass = 'fas fa-file-pdf text-primary';
            iconBgClass = 'bg-primary bg-opacity-10';
            break;
        case 'Video':
            iconClass = 'fas fa-video text-danger';
            iconBgClass = 'bg-danger bg-opacity-10';
            break;
        case 'Link / Article':
            iconClass = 'fas fa-link text-success';
            iconBgClass = 'bg-success bg-opacity-10';
            break;
        case 'Code Snippet':
            iconClass = 'fas fa-code text-info';
            iconBgClass = 'bg-info bg-opacity-10';
            break;
    }
    
    // Create card HTML
    col.innerHTML = `
        <div class="card h-100 border-0 shadow-sm resource-card">
            <div class="card-body">
                <div class="d-flex mb-3">
                    <div class="resource-icon ${iconBgClass} p-3 rounded me-3">
                        <i class="${iconClass} fa-2x"></i>
                    </div>
                    <div>
                        <h5 class="card-title mb-0">${title}</h5>
                        <p class="text-muted small mb-0">${type}</p>
                    </div>
                </div>
                <p class="card-text">${description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="small text-muted">
                        <i class="fas fa-tag me-1"></i> ${tags || `${category}, ${level}`}
                    </div>
                    <div class="resource-votes">
                        <button class="btn btn-sm btn-light vote-button" data-resource-id="new" data-vote-type="up">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                        <span class="vote-count text-success" data-resource-id="new">0</span>
                        <button class="btn btn-sm btn-light vote-button" data-resource-id="new" data-vote-type="down">
                            <i class="fas fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-white d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img src="https://ui-avatars.com/api/?name=Alex+Smith&background=random" alt="User" class="rounded-circle me-2" width="24" height="24">
                    <small>Alex Smith</small>
                </div>
                <a href="#" class="btn btn-sm btn-primary">
                    <i class="fas fa-${type === 'Video' ? 'play' : type === 'Link / Article' ? 'external-link-alt' : type === 'Code Snippet' ? 'code' : 'download'} me-1"></i> 
                    ${type === 'Video' ? 'Watch' : type === 'Link / Article' ? 'Visit' : type === 'Code Snippet' ? 'View Code' : 'Download'}
                </a>
            </div>
        </div>
    `;
    
    // Add to grid
    resourcesGrid.prepend(col);
    
    // Initialize voting for new card
    initializeResourceVotingForCard(col.querySelector('.resource-card'));
}

// Initialize resource voting
function initializeResourceVoting() {
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        initializeResourceVotingForCard(card);
    });
}

// Initialize voting for a specific card
function initializeResourceVotingForCard(card) {
    const voteButtons = card.querySelectorAll('.vote-button');
    
    voteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resourceId = this.getAttribute('data-resource-id');
            const voteType = this.getAttribute('data-vote-type');
            const voteCount = card.querySelector(`.vote-count[data-resource-id="${resourceId}"]`);
            
            if (!voteCount) return;
            
            let currentCount = parseInt(voteCount.textContent);
            
            // Check if user has already voted
            if (this.classList.contains('active')) {
                // Remove vote
                this.classList.remove('active');
                currentCount = voteType === 'up' ? currentCount - 1 : currentCount + 1;
            } else {
                // Add vote
                this.classList.add('active');
                
                // Remove opposite vote if exists
                const oppositeButton = card.querySelector(`.vote-button[data-resource-id="${resourceId}"][data-vote-type="${voteType === 'up' ? 'down' : 'up'}"]`);
                if (oppositeButton && oppositeButton.classList.contains('active')) {
                    oppositeButton.classList.remove('active');
                    currentCount = voteType === 'up' ? currentCount + 2 : currentCount - 2;
                } else {
                    currentCount = voteType === 'up' ? currentCount + 1 : currentCount - 1;
                }
            }
            
            // Update vote count
            voteCount.textContent = currentCount;
            
            // Update color based on count
            if (currentCount > 0) {
                voteCount.className = 'vote-count text-success';
            } else if (currentCount < 0) {
                voteCount.className = 'vote-count text-danger';
            } else {
                voteCount.className = 'vote-count text-muted';
            }
        });
    });
}

/**
 * Feedback Page Functionality
 */
function initializeFeedbackPage() {
    console.log('Initializing Feedback Page');
    
    // Initialize star rating
    initializeStarRating();
    
    // Initialize feedback form
    initializeFeedbackForm();
    
    // Initialize feedback filters
    initializeFeedbackFilters();
}

// Initialize star rating
function initializeStarRating() {
    const ratingStars = document.querySelectorAll('.rating-stars i');
    const ratingText = document.getElementById('ratingText');
    const ratingValue = document.getElementById('ratingValue');
    
    if (!ratingStars.length || !ratingText || !ratingValue) return;
    
    // Rating text options
    const ratingTexts = [
        'Poor - Did not meet expectations',
        'Fair - Needs improvement',
        'Good - Met expectations',
        'Very Good - Exceeded expectations',
        'Excellent - Outstanding session'
    ];
    
    // Add event listeners to stars
    ratingStars.forEach((star, index) => {
        // Hover effect
        star.addEventListener('mouseover', function() {
            // Reset all stars
            ratingStars.forEach(s => s.className = 'far fa-star');
            
            // Fill stars up to current
            for (let i = 0; i <= index; i++) {
                ratingStars[i].className = 'fas fa-star';
            }
            
            // Update text
            ratingText.textContent = ratingTexts[index];
        });
        
        // Click to select
        star.addEventListener('click', function() {
            // Set rating value
            ratingValue.value = index + 1;
            
            // Update text
            ratingText.textContent = ratingTexts[index];
            
            // Add selected class to remember selection
            ratingStars.forEach(s => s.classList.remove('selected'));
            for (let i = 0; i <= index; i++) {
                ratingStars[i].classList.add('selected');
            }
        });
    });
    
    // Reset on mouseout if no selection
    document.querySelector('.rating-stars').addEventListener('mouseout', function() {
        if (ratingValue.value === '0') {
            // Reset all stars
            ratingStars.forEach(s => s.className = 'far fa-star');
            ratingText.textContent = 'Select a rating';
        } else {
            // Reset to selected rating
            const selectedRating = parseInt(ratingValue.value);
            
            // Reset all stars
            ratingStars.forEach(s => s.className = 'far fa-star');
            
            // Fill stars up to selected
            for (let i = 0; i < selectedRating; i++) {
                ratingStars[i].className = 'fas fa-star selected';
            }
            
            // Update text
            ratingText.textContent = ratingTexts[selectedRating - 1];
        }
    });
}

// Initialize feedback form
function initializeFeedbackForm() {
    const feedbackForm = document.querySelector('#leaveFeedbackModal form');
    if (!feedbackForm) return;
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateFeedbackForm(this)) {
            // Simulate submitting feedback
            const submitBtn = this.querySelector('button[type="button"].btn-primary');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Submitting...';
            
            setTimeout(() => {
                // Hide modal
                bootstrap.Modal.getInstance(document.getElementById('leaveFeedbackModal')).hide();
                
                // Show success message
                showSuccessMessage('Feedback submitted successfully!');
                
                // Reset form
                this.reset();
                
                // Reset rating stars
                document.querySelectorAll('.rating-stars i').forEach(star => {
                    star.className = 'far fa-star';
                });
                document.getElementById('ratingText').textContent = 'Select a rating';
                document.getElementById('ratingValue').value = '0';
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        }
    });
}

// Validate feedback form
function validateFeedbackForm(form) {
    const ratingValue = form.querySelector('#ratingValue');
    const feedbackComments = form.querySelector('#feedbackComments');
    
    let isValid = true;
    
    // Reset previous error states
    form.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    
    // Validate rating
    if (ratingValue.value === '0') {
        document.querySelector('.rating-stars').classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate comments
    if (!feedbackComments.value.trim()) {
        feedbackComments.classList.add('is-invalid');
        isValid = false;
    }
    
    return isValid;
}

// Initialize feedback filters
function initializeFeedbackFilters() {
    const filterDropdowns = document.querySelectorAll('.dropdown-menu[aria-labelledby*="feedbackFilter"]');
    
    filterDropdowns.forEach(dropdown => {
        const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get filter value
                const filterValue = this.textContent.trim();
                
                // Update dropdown button text
                const dropdownButton = document.querySelector(`[aria-expanded][id="${dropdown.getAttribute('aria-labelledby')}"]`);
                if (dropdownButton) {
                    dropdownButton.innerHTML = `<i class="fas fa-filter me-1"></i> ${filterValue}`;
                }
                
                // Apply filter
                console.log(`Applying filter: ${filterValue}`);
                
                // In a real app, this would filter the feedback items
                // For now, we'll just log it
            });
        });
    });
}

// Helper function to format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Helper function to format time
function formatTime(time) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(`1970-01-01T${time}`).toLocaleTimeString(undefined, options);
}

// Declare bootstrap variable
const bootstrap = window.bootstrap;