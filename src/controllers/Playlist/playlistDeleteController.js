import Playlist from '../../models/Playlist.js';

export const deletePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params; // Obtener playlistId desde los parámetros de la URL

        // Verificar si existe la playlist con el playlistId proporcionado
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist no encontrada' });
        }

        // Eliminar la playlist basada en su ObjectId
        await Playlist.findByIdAndDelete(playlistId);

        // Respuesta formateada
        const response = {
            message: {
                description: 'Playlist eliminada correctamente',
                code: 0,  // Código de éxito, ajusta según tu convención de códigos de respuesta
            },
            data: {
                playlist: playlist,  // Incluir más detalles de la playlist si es necesario
            },
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
