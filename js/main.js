// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Command search functionality
const searchInput = document.getElementById('command-search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const commandCategories = document.querySelectorAll('.command-category');
        
        commandCategories.forEach(category => {
            const commands = category.querySelectorAll('.command-item');
            let hasVisibleCommands = false;
            
            commands.forEach(command => {
                const commandName = command.querySelector('h3').textContent.toLowerCase();
                const commandDesc = command.querySelector('p').textContent.toLowerCase();
                const commandUsage = command.querySelector('.usage').textContent.toLowerCase();
                const examples = command.querySelector('.command-examples')?.textContent.toLowerCase() || '';
                
                const isVisible = 
                    commandName.includes(searchTerm) || 
                    commandDesc.includes(searchTerm) || 
                    commandUsage.includes(searchTerm) ||
                    examples.includes(searchTerm);
                
                command.style.display = isVisible ? 'block' : 'none';
                if (isVisible) hasVisibleCommands = true;
            });
            
            // Show/hide entire category based on if it has matching commands
            category.style.display = hasVisibleCommands ? 'block' : 'none';
        });
        
        // Show no results message if needed
        const noResults = document.getElementById('no-results');
        const hasVisibleCategories = Array.from(commandCategories)
            .some(category => category.style.display !== 'none');
            
        if (!hasVisibleCategories) {
            if (!noResults) {
                const message = document.createElement('div');
                message.id = 'no-results';
                message.className = 'no-results';
                message.textContent = 'No commands found matching your search';
                document.querySelector('.commands-grid').appendChild(message);
            }
        } else {
            noResults?.remove();
        }
    });
} 