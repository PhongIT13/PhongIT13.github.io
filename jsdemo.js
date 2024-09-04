function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  
          const slides = document.querySelector('.slides');
          const images = document.querySelectorAll('.slides img');
          let currentIndex = 0;
  
          function showSlide(index) {
              if (index >= images.length) {
                  currentIndex = 0;
              } else if (index < 0) {
                  currentIndex = images.length - 1;
              } else {
                  currentIndex = index;
              }
              slides.style.transform = `translateX(-${currentIndex * 100}%)`;
          }
  
          document.getElementById('next').addEventListener('click', () => {
              showSlide(currentIndex + 1);
          });
  
          document.getElementById('prev').addEventListener('click', () => {
              showSlide(currentIndex - 1);
          });
          const dragItems = document.querySelectorAll('.drag-item');
          const dropZone = document.getElementById('dropZone');
  
          dragItems.forEach(item => {
              item.addEventListener('dragstart', (e) => {
                  e.dataTransfer.setData('text/plain', e.target.id);
              });
          });
  
          dropZone.addEventListener('dragover', (e) => {
              e.preventDefault();
          });
  
          dropZone.addEventListener('drop', (e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData('text');
              const draggedElement = document.getElementById(id);
              dropZone.appendChild(draggedElement);
          });
  
// JavaScript cho bo cau hoi
function submitQuiz() {
    const correctAnswers = {
        q1: 'true',
        q2: 'false',
        q3: 'a',
        q4: 'c',
        q5: ['a', 'b'],
        q6: '13', // Ví dụ câu trả lời ngắn
        dragAndDrop: ['item3'] // Ví dụ đúng item đã được thả
    };

    let score = 0;
    let totalQuestions = 7; // Tính luôn câu drag-and-drop

    // Kiểm tra True/False
    for (let i = 1; i <= 2; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer && answer.value === correctAnswers[`q${i}`]) {
            score++;
        }
    }

    // Kiểm tra Single Answer
    for (let i = 3; i <= 4; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (answer && answer.value === correctAnswers[`q${i}`]) {
            score++;
        }
    }

    // Kiểm tra Multi Answer
    const selectedAnswers = Array.from(document.querySelectorAll('input[name="q5"]:checked'))
                                  .map(input => input.value);
    if (JSON.stringify(selectedAnswers.sort()) === JSON.stringify(correctAnswers.q5.sort())) {
        score++;
    }

    // Kiểm tra Short Answer
    const shortAnswer = document.querySelector('input[name="q6"]').value.trim();
    if (shortAnswer === correctAnswers.q6) {
        score++;
    }

    // Kiểm tra Drag and Drop
    const droppedItems = Array.from(dropZone.children).map(child => child.id);
    if (JSON.stringify(droppedItems.sort()) === JSON.stringify(correctAnswers.dragAndDrop.sort())) {
        score++;
    }

    // Hiển thị kết quả
    document.getElementById('result').innerHTML = `Bạn đã trả lời đúng ${score}/${totalQuestions} câu.`;
}
//làm lại
function resetQuiz() {
    // Đặt lại tất cả các radio và checkbox
    const inputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    inputs.forEach(input => {
        input.checked = false;
    });

    // Đặt lại các câu trả lời ngắn
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        input.value = '';
    });

    // Đặt lại các item kéo thả
    const dropZone = document.getElementById('dropZone');
    const dragAndDropContainer = document.querySelector('.drag-and-drop');
    const dragItems = dragAndDropContainer.querySelectorAll('.drag-item');
    
    dragItems.forEach(item => {
        dragAndDropContainer.appendChild(item); // Đưa item về vị trí ban đầu
    });

    // Xóa kết quả hiển thị
    document.getElementById('result').innerHTML = '';
}
