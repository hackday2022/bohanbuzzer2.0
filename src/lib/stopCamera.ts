import Quagga from '@ericblade/quagga2'

export default function StopCamera() {
    document.getElementById('modal')!.style.display = 'none'
    Quagga.stop()
}
