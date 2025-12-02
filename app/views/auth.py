from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


def login_view(request):
    """Login page."""
    if request.user.is_authenticated:
        return redirect('app:home')
    
    error = None
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            next_url = request.GET.get('next', 'app:home')
            return redirect(next_url)
        else:
            error = 'Invalid username or password'
    
    return render(request, 'app/auth/login.html', {'error': error})


@login_required
def logout_view(request):
    """Logout and redirect to home."""
    logout(request)
    return redirect('app:home')

