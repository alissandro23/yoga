const tabs = document.querySelectorAll('.info-header-tab');


function showTab(tabHeader) {
    const tabId = tabHeader.getAttribute('data-tab');

    const tabContents = document.querySelectorAll('.info-tabcontent');
    tabContents.forEach(function (content) {
        content.style.display = 'none';
    });

    const activeTabContent = document.getElementById(tabId);
    activeTabContent.style.display = 'flex';

    tabs.forEach(function (tab) {
        tab.classList.remove('active');
    });
    tabHeader.classList.add('active');
}

tabs.forEach(function (tab) {
    tab.addEventListener('click', function() {
        showTab(this)
    });
});

showTab(tabs[0])

