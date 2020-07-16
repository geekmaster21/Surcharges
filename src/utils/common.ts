export function StopEvent(e: any) {
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
}
