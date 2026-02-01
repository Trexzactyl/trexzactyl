@if(Auth::user()->root_admin)
<div style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
    <a href="{{ route('admin.react') }}" 
       class="btn btn-primary"
       style="background: #1890ff; border: none; padding: 8px 16px; border-radius: 6px; color: white; text-decoration: none; font-size: 14px; box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);">
        🚀 Try New Admin Panel
    </a>
</div>
@endif