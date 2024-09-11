const mainPartition = document.getElementById('main-partition');
const verticalBtn = document.getElementById('vertical');
const horizontalBtn = document.getElementById('horizontal');

// Initial button event listeners
verticalBtn.addEventListener('click', () => splitPartition(mainPartition, 'vertical'));
horizontalBtn.addEventListener('click', () => splitPartition(mainPartition, 'horizontal'));

function splitPartition(parentPartition, direction) {
    const newPartition1 = document.createElement('div');
    const newPartition2 = document.createElement('div');

    newPartition1.classList.add('partition');
    newPartition2.classList.add('partition');
    newPartition1.style.backgroundColor = getRandomColor();
    newPartition2.style.backgroundColor = getRandomColor();

    parentPartition.style.display = 'flex';
    parentPartition.style.flexDirection = window.innerWidth < 768 ? 'column' : (direction === 'vertical' ? 'row' : 'column');

    parentPartition.innerHTML = '';
    parentPartition.appendChild(newPartition1);
    parentPartition.appendChild(newPartition2);

    addControlBtn(newPartition1);
    addControlBtn(newPartition2);

    makeResizable(newPartition1, direction === 'vertical' ? 'horizontal' : 'vertical');
    makeResizable(newPartition2, direction === 'vertical' ? 'horizontal' : 'vertical');
}

function addControlBtn(partition) {
    const vBtn = document.createElement('button');
    const hBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    vBtn.textContent = 'V';
    hBtn.textContent = 'H';
    removeBtn.textContent = '–';

    vBtn.addEventListener('click', () => splitPartition(partition, 'vertical'));
    hBtn.addEventListener('click', () => splitPartition(partition, 'horizontal'));
    removeBtn.addEventListener('click', () => partition.remove());

    partition.appendChild(vBtn);
    partition.appendChild(hBtn);
    partition.appendChild(removeBtn);
}

function getRandomColor() {
    const color = Math.random().toString(16).slice(2, 8);
    return `#${color.padEnd(6, '0')}`;
}


function makeResizable(partition, direction) {
    let isResizing = false, startX, startY, startWidth, startHeight;

    partition.addEventListener('mousedown', function (e) {
        if (e.target === partition) {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = partition.offsetWidth;
            startHeight = partition.offsetHeight;

            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        }
    });

    function resize(e) {
        if (isResizing) {
            if (direction === 'horizontal') {
                partition.style.width = startWidth + (e.clientX - startX) + 'px';
            } else {
                partition.style.height = startHeight + (e.clientY - startY) + 'px';
            }
        }
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }
}
