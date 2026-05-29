interface ProfilePicProps {
    url: string;
}

export default function ProfilePic({ url }: ProfilePicProps) {
    return <img src={url} className='size-12 flex-none rounded-full bg-gray-50' />;
}
