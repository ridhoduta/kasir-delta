# Route::patch('pesanan/{id}/shipping-status', [PesananController::class, 'updateShippingStatus'])->middleware(['auth:sanctum', 'can:admin']);
# public function updateShippingStatus(Request $request, $id)
   {
        $request->validate([
            'status' => 'required|in:menunggu,diproses,dikirim,selesai',
        ]);

    $pesanan = Pesanan::findOrFail($id);
    $pesanan->update(['pengiriman_status' => $request->status]);

    return response()->json([
        'message' => 'Status pengiriman berhasil diperbarui.',
        'pesanan' => $pesanan
    ]);
}