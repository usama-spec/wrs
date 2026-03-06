document.addEventListener('DOMContentLoaded', () => {
    const monthYearEl = document.getElementById('month-year');
    const daysGrid = document.getElementById('days-grid');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentDate = new Date();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const renderCalendar = (direction = null) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        monthYearEl.textContent = `${months[month]} ${year}`;
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        if (direction) {
            daysGrid.className = `days-grid animating-${direction}`;
            setTimeout(() => {
                createDays(firstDayOfMonth, daysInMonth, month, year, today);
                daysGrid.className = `days-grid incoming-${direction}`;
            }, 300);
        } else {
            createDays(firstDayOfMonth, daysInMonth, month, year, today);
        }
    };
    const createDays = (firstDay, totalDays, currentMonth, currentYear, today) => {
        daysGrid.innerHTML = '';
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'empty');
            daysGrid.appendChild(emptyDay);
        }
        for (let i = 1; i <= totalDays; i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('day');
            dayEl.textContent = i;
            if (i === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear()) {
                dayEl.classList.add('today');
            }
            dayEl.addEventListener('click', () => {
                document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
                dayEl.classList.add('selected');
                dayEl.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.2)' },
                    { transform: 'scale(1)' }
                ], { duration: 200 });
            });
            daysGrid.appendChild(dayEl);
        }
    };
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar('prev');
    });
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar('next');
    });
    renderCalendar();
});