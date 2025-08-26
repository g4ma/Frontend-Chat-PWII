interface MainDisplayProps {
    children: React.ReactNode;
}

export default function MainDisplay({ children }: MainDisplayProps) {

    return (
        <MainDisplay>
            {children}
        </MainDisplay>
    )  ;

}