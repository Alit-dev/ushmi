import { useState, useEffect, useRef } from 'react';

/**
 * Hook to calculate rotation and progress from a circular touch/drag interaction.
 */
export const useTouchRotation = (targetTotalRotations = 5) => {
    const [rotation, setRotation] = useState(0);
    const [progress, setProgress] = useState(0); // 0 to 1
    const [isDragging, setIsDragging] = useState(false);

    const elementRef = useRef(null);
    const lastAngleRef = useRef(null);
    const accumulatedRotationRef = useRef(0);

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;

        const handlePointerDown = (e) => {
            setIsDragging(true);
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            lastAngleRef.current = angle;
        };

        const handlePointerMove = (e) => {
            if (!isDragging || lastAngleRef.current === null) return;

            // Prevent scrolling while cranking
            e.preventDefault();

            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            let deltaAngle = currentAngle - lastAngleRef.current;

            // Handle wrap-around (-PI to PI)
            if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
            if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;

            // Only allow forward (clockwise) rotation or limit backward
            // deltaAngle is positive for clockwise in standard coordinates?
            // screen Y is down, so atan2(y, x) increases clockwise.
            if (deltaAngle > 0) {
                accumulatedRotationRef.current += deltaAngle;
            }

            lastAngleRef.current = currentAngle;

            const totalDegrees = (accumulatedRotationRef.current / Math.PI) * 180;
            setRotation(totalDegrees);

            const targetDegrees = targetTotalRotations * 360;
            const currentProgress = Math.min(Math.max(totalDegrees / targetDegrees, 0), 1);
            setProgress(currentProgress);

            // Haptic feedback
            if (deltaAngle > 0.1 && navigator.vibrate) {
                navigator.vibrate(10);
            }
        };

        const handlePointerUp = () => {
            setIsDragging(false);
            lastAngleRef.current = null;
        };

        el.addEventListener('pointerdown', handlePointerDown, { passive: false });
        window.addEventListener('pointermove', handlePointerMove, { passive: false });
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointercancel', handlePointerUp);

        return () => {
            el.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointercancel', handlePointerUp);
        };
    }, [isDragging, targetTotalRotations]);

    return { elementRef, rotation, progress, isDragging };
};
