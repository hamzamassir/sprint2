document.addEventListener('DOMContentLoaded', () => {
    const container1 = document.querySelector('.cards1'); 
    const container2 = document.querySelector('.cards2'); 


    // card createion
    function createCard(imageSrc, title, description, linkText, linkHref) {
        const card = document.createElement('div');
        card.className = 'group bg-blue-50 dark:bg-gray-700 h-[430px] overflow-hidden transition-all duration-300 hover:bg-blue-900 dark:hover:bg-blue-900';

        card.innerHTML = `
            <div class="h-48 overflow-hidden">
                <picture>
                    <!-- Desktop screens -->
                    <source
                      media="(min-width: 1024px)"
                      srcset="${imageSrc.s1280}"
                      sizes="1280px"
                    />

                    <!-- Tablet screens -->
                    <source
                      media="(min-width: 768px)"
                      srcset="${imageSrc.s960}"
                      sizes="960px"
                    />

                    <!-- Mobile screens -->
                    <source
                      media="(max-width: 767px)"
                      srcset="${imageSrc.s640}"
                      sizes="640px"
                    />

                    <!-- Fallback image -->
                    <img
                      src="${imageSrc.s960}"
                      alt="computer"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </picture>
            </div>
            <div class="p-6">
                <h3 class="text-blue-900 dark:text-blue-300 group-hover:text-white text-xl font-bold mb-3">
                    ${title}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 group-hover:text-blue-100 mb-4">
                    ${description}
                </p>
                <a href="${linkHref}" class="text-blue-900 dark:text-blue-300 group-hover:text-white font-medium hover:underline">
                    ${linkText}
                </a>
            </div>
        `;
        return card;
    }

    //  card
    const cardDetails = [
        {
            imageSrc:{
                s1280: '../assets/computer-1280.webp',
                s960: '../assets/computer-960.webp',
                s640: '../assets/computer-640.webp'
            },
            title: 'لوريم إيبسوم',
            description: 'لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد. كان لوريم إيبسوم هو النص القياسي للصناعة.',
            linkText: 'المزيد لك',
            linkHref: '#'
        },
        {
            imageSrc:{
                s1280: '../assets/computer-1280.webp',
                s960: '../assets/computer-960.webp',
                s640: '../assets/computer-640.webp'
            },
            title: 'لوريم إيبسوم',
            description: 'لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد. كان لوريم إيبسوم هو النص القياسي للصناعة.',
            linkText: 'المزيد لك',
            linkHref: '#'
        },{
            imageSrc:{
                s1280: '../assets/computer-1280.webp',
                s960: '../assets/computer-960.webp',
                s640: '../assets/computer-640.webp'
            },
            title: 'لوريم إيبسوم',
            description: 'لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد. كان لوريم إيبسوم هو النص القياسي للصناعة.',
            linkText: 'المزيد لك',
            linkHref: '#'
        },{
            imageSrc:{
                s1280: '../assets/computer-1280.webp',
                s960: '../assets/computer-960.webp',
                s640: '../assets/computer-640.webp'
            },
            title: 'لوريم إيبسوم',
            description: 'لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد. كان لوريم إيبسوم هو النص القياسي للصناعة.',
            linkText: 'المزيد لك',
            linkHref: '#'
        },
    ];
    
    //cards to the container
    cardDetails.forEach(detail => {
        const card = createCard(detail.imageSrc, detail.title, detail.description, detail.linkText, detail.linkHref);
        container1.appendChild(card);
        container2.appendChild(card.cloneNode(true));
    });
});