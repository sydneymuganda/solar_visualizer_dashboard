const Overlay = (props) => {
    return (
        <div
            className="fixed h-screen w-screen bg-[#212121] opacity-50 z-10"
            onClick={(props.setMenuStatus)}
        >
        </div>
    )
};

export default Overlay;