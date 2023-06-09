<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $Order;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($Order)
    {
        $this->Order = $Order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $Order = $this->Order;

        $mail = $this->view('emails.orderConfirmation')
            ->with(['Order' => $Order])
            ->subject('CopyBen - Nouvelle commande en ligne - ' . $this->Order['Order ID']);

        // Attach files
        // 
        // 
        if (isset($Order['Files']) && is_array($Order['Files']) && count($Order['Files']) > 0) {
            $files = $Order['Files'];
            if (is_array($files)) {
                foreach ($files as $file) {
                    $mail->attach(storage_path('app/' . $file), [
                        'as' => $file,
                    ]);
                }
            }
        }

        return $mail;
    }
}