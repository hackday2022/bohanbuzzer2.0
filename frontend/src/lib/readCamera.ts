import Quagga from '@ericblade/quagga2'

export default function ReadCamera(setDeviceSirial: any) {
  Quagga.init(
    {
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
      },
      decoder: {
        readers: ['code_128_reader'],
      },
    },
    function (err) {
      if (err) {
        Quagga.stop()
        alert(
          'この機能を利用するには\nブラウザのカメラ利用を許可してください。'
        )
      }
      console.log('Initialization finished. Ready to start')
      Quagga.start()
    }
  )
  if (document.getElementById('modal')) {
    document.getElementById('modal')!.style.display = 'block'
  }
  Quagga.onDetected((result) => {
    document.getElementById('modal')!.style.display = 'none'
    const code = result.codeResult.code
    setDeviceSirial(code)
    Quagga.stop()
    return code
  })
}
