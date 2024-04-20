import Image from "next/image";

export default function Guest() {
    return (
        <nav class="navbar navbar-expand-lg bg-vcs-blue">
            <div class="container-fluid mx-5">
                <a class="navbar-brand" href="#">
                    <Image
                        src="https://vcsgroupthai.com/wp-content/uploads/2023/09/Screenshot-2023-07-14-164438-depositphotos-bgremover.png"
                        alt="Vercel Logo"
                        width={42}
                        height={25}
                        priority
                    />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <button type="button" class="btn btn btn-outline-light" aria-current="page" href="#">Sign in</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
