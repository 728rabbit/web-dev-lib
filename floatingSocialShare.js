class floatingSocialShare {
    constructor() {
        this.isVisible = false;
        this.init();
        this.showSocialButtons();
    }

    init() {
        // Create main floating button and social buttons container
        const floatingButtonDiv = document.createElement('div');
        this.mainButton = document.createElement('button');
        this.socialButtonsDiv = document.createElement('div');

        // Apply styles to the main button container (positioned at the bottom-right)
        this.applyStyles(floatingButtonDiv, {
            position: 'fixed',
            top: '50%',
            left: '0px',
            zIndex: '8'
        });

        // Apply styles to the main button (toggle visibility of social media buttons)
        this.applyStyles(this.mainButton, {
            display: 'none',
            width: '36px',
            height: '36px',
            backgroundColor: '#f44336',
            borderRadius: '50%',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            textAlign: 'center'
        });
        this.mainButton.innerHTML = '<i class="fa fa-share-alt"></i>';
        this.mainButton.addEventListener('click', () => this.toggleSocialButtons());

        // Apply styles to the social buttons container (hidden initially)
        this.applyStyles(this.socialButtonsDiv, {
            display: 'none',
            flexDirection: 'column',
            gap: '2px',
            marginBottom: '10px',
        });

        // Create social media buttons (using Font Awesome icons)
        const socialMedia = [{
                name: 'Facebook',
                color: '#3b5998',
                icon: 'fa fa-facebook-f',
                url: this.getFacebookUrl()
            },
            {
                name: 'WhatsApp',
                color: '#25d366',
                icon: 'fa fa-whatsapp',
                url: this.getWhatsAppUrl()
            },
            /*{
                name: 'Twitter',
                color: '#1da1f2',
                icon: 'fa fa-twitter',
                url: this.getTwitterUrl()
            },*/
            {
                name: 'Email',
                color: '#168de2',
                icon: 'fa fa-envelope',
                url: this.getEmailUrl()
            },
            {
                name: 'CopyLink',
                color: '#7d7d7d',
                icon: 'fa fa-link',
                url: this.getCopyUrl(),
                
            }
        ];

        this.socialButtons = socialMedia.map((platform) => {
            const button = document.createElement('a');
            button.href = platform.url;
            button.target = '_blank';
            this.applyStyles(button, {
                width: '36px',
                height: '36px',
                backgroundColor: platform.color,
                borderRadius: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textDecoration: 'none',
                fontSize: '20px',
                opacity: '0', // Initially hidden
                transform: 'translateY(20px)',
                transition: `opacity 0.3s ease, transform 0.3s ease`,
            });

            // Create the Font Awesome icon inside the button
            const icon = document.createElement('i');
            icon.className = platform.icon; // Add the icon class
            button.appendChild(icon);
            
            if(platform.name === 'CopyLink') {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = e.currentTarget.getAttribute('href');
                    navigator.clipboard.writeText(decodeURIComponent(href)).then(() => {
                        this.showCopyToast('The URL has been copied!');
                    })
                    .catch(err => {
                        this.showCopyToast('Failed to copy url: ', err);
                    });
                });
            }

            // Close button functionality
            if (platform.name === 'Close') {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.hideSocialButtons();
                });
            }

            this.socialButtonsDiv.appendChild(button);
            return button;
        });

        // Append elements to the floating button container
        floatingButtonDiv.appendChild(this.socialButtonsDiv);
        floatingButtonDiv.appendChild(this.mainButton);
        document.body.appendChild(floatingButtonDiv);
    }

    toggleSocialButtons() {
        this.isVisible = !this.isVisible;
        if (this.isVisible) {
            this.showSocialButtons();
            this.mainButton.innerHTML = '<i class="fa fa-times"></i>';
        } else {
            this.hideSocialButtons();
            this.mainButton.innerHTML = '<i class="fa fa-share-alt"></i>';
        }
    }

    showSocialButtons() {
        this.socialButtonsDiv.style.display = 'flex';
        this.socialButtons.forEach((button, index) => {
            setTimeout(() => {
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, index * 100); // Slight delay between each button
        });
    }

    hideSocialButtons() {
        this.socialButtons.forEach((button, index) => {
            setTimeout(() => {
                button.style.opacity = '0';
                button.style.transform = 'translateY(20px)';
                if (index === this.socialButtons.length - 1) {
                    setTimeout(() => {
                        this.socialButtonsDiv.style.display = 'none';
                    }, 300); // Delay to fully hide the container after the last button animation
                }
            }, index * 100); // Slight delay between each button
        });
    }
    
    showCopyToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;

        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#168de2',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            opacity: '0',
            pointerEvents: 'none',
            transition: 'opacity 0.4s ease',
            zIndex: '999'
        });

        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 400);
        }, 2000);
    }

    applyStyles(element, styles) {
        for (const property in styles) {
            element.style[property] = styles[property];
        }
    }
    
    getFacebookUrl() {
        const pageURL = encodeURIComponent(window.location.href);
        return `https://www.facebook.com/sharer/sharer.php?u=${pageURL}`;
    }

    getWhatsAppUrl() {
        const pageURL = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        return `https://wa.me/?text=${pageTitle}%20${pageURL}`;
    }

    getTwitterUrl() {
        const pageURL = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        return `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageURL}`;
    }
    
    getEmailUrl() {
        const pageURL = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        return `mailto:?subject=${pageTitle}&body=${pageURL}`;
    }
    
    getCopyUrl() {
        const pageURL = encodeURIComponent(window.location.href);
        return pageURL;
    }
}
