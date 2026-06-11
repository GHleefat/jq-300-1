export function Player() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-4xl md:text-5xl animate-bounce-slow drop-shadow-lg">
        🧑‍🍳
      </div>
      <div className="absolute -inset-2 bg-primary-300/30 rounded-full animate-ping" />
    </div>
  )
}
