const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectmovie = document.getElementById('movie');

let ticketprice = +selectmovie.value;

showdata();

function saveselectedmoviedata(mindex,mprice)
{
    localStorage.setItem('SelectedMovie', mindex);
    localStorage.setItem('SelectedMoviePrice', mprice);
}

function updatecount()
    {
    const selectedseats = document.querySelectorAll('.row .seat.selected');

    const seatindex = [...selectedseats].map(seat => [...seats].indexOf(seat));
    
    localStorage.setItem('SeletedSeats', JSON.stringify(seatindex));

    const totalcount = selectedseats.length;

    count.innerText = totalcount;

    total.innerText = totalcount * ticketprice;

}

function showdata()
{
    const selectedSeats = JSON.parse(localStorage.getItem('SeletedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0)
    {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
         
    }
    const selectedmovieindex = localStorage.getItem('SelectedMovie');
    if(selectedmovieindex !== null)
    {
        selectmovie.selectedIndex = selectedmovieindex;
    }
}
    
selectmovie.addEventListener('change', e => {
    ticketprice = +e.target.value;
    saveselectedmoviedata(e.target.selectedIndex, e.target.value);
    updatecount();
});

container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }
    updatecount();
});

updatecount();
